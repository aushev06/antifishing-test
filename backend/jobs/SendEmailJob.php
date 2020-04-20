<?php

declare(strict_types=1);

namespace backend\jobs;


use Yii;
use yii\base\BaseObject;
use yii\queue\JobInterface;
use yii\queue\Queue;

class SendEmailJob extends BaseObject implements JobInterface
{
	/**
	 * @var string
	 */
	public $email;
	const ATTR_EMAIL = 'email';
	/**
	 * @var string
	 */
	public $text;
	const ATTR_TEXT = 'text';

	public function execute($queue)
	{
		Yii::$app
			->mailer
			->compose(
				['text' => 'emailVerify-text'],
				['text' => $this->text]
			)
			->setFrom('admin@test.ru')
			->setTo($this->email)
			->setSubject('Account registration at ' . Yii::$app->name)
			->send();

		return true;
	}
}