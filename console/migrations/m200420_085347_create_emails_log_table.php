<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%emails_log}}`.
 */
class m200420_085347_create_emails_log_table extends Migration
{
	const TABLE_NAME = 'emails_log';

	/**
	 * {@inheritdoc}
	 */
	public function safeUp()
	{
		$this->createTable(static::TABLE_NAME, [
			'id'         => $this->primaryKey(),
			'email'      => $this->string()->notNull(),
			'text'       => $this->text(),
			'created_at' => $this->integer(),
			'updated_at' => $this->integer(),
		]);
	}

	/**
	 * {@inheritdoc}
	 */
	public function safeDown()
	{
		$this->dropTable(static::TABLE_NAME);
	}
}
