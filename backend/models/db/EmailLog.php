<?php

namespace app\models\db;

use backend\jobs\SendEmailJob;
use Yii;
use yii\behaviors\TimestampBehavior;
use yii\validators\RequiredValidator;
use yii\validators\StringValidator;

/**
 * This is the model class for table "emails_log".
 *
 * @property int $id
 * @property string $email
 * @property string|null $text
 * @property int|null $created_at
 * @property int|null $updated_at
 */
class EmailLog extends \yii\db\ActiveRecord
{
	const     ATTR_ID         = 'id';
	const     ATTR_EMAIL      = 'email';
	const     ATTR_TEXT       = 'text';
	const     ATTR_CREATED_AT = 'created_at';
	const     ATTR_UPDATED_AT = 'updated_at';

	/**
	 * @return array
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function fields()
	{
		return array_merge(parent::fields(), [
			'key' => function (self $model) {
				return $model->id;
			}
		]);
	}

	/**
	 * {@inheritdoc}
	 */
	public static function tableName()
	{
		return 'emails_log';
	}

	/**
	 * {@inheritdoc}
	 */
	public function rules()
	{
		return [
			[[static::ATTR_EMAIL], RequiredValidator::class],
			[[static::ATTR_TEXT], StringValidator::class],
			[['created_at', 'updated_at'], 'integer'],
			[['email'], 'string', 'max' => 255],
		];
	}

	/**
	 * {@inheritdoc}
	 */
	public function attributeLabels()
	{
		return [
			'id'         => 'ID',
			'email'      => 'Email',
			'text'       => 'Text',
			'created_at' => 'Created At',
			'updated_at' => 'Updated At',
		];
	}

	/**
	 * {@inheritdoc}
	 * @return \app\models\db\queries\EmailLogQuery the active query used by this AR class.
	 */
	public static function find()
	{
		return new \app\models\db\queries\EmailLogQuery(get_called_class());
	}

	/**
	 * @return array|array[]
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function behaviors()
	{
		return [
			[
				'class'              => TimestampBehavior::class,
				'createdAtAttribute' => static::ATTR_CREATED_AT,
				'updatedAtAttribute' => static::ATTR_UPDATED_AT,
				'value'              => time(),
			],
		];
	}

	public function beforeSave($insert)
	{
		Yii::$app->errorHandler->logException(new \Exception('test'));

		Yii::$app->queue->push(new SendEmailJob([
			SendEmailJob::ATTR_EMAIL => $this->email,
			SendEmailJob::ATTR_TEXT  => $this->text
		]));

		return parent::beforeSave($insert);
	}
}
