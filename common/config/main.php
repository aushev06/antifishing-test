<?php
return [
	'aliases'    => [
		'@bower' => '@vendor/bower-asset',
		'@npm'   => '@vendor/npm-asset',
	],
	'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
	'bootstrap'  => ['queue'],
	'components' => [
		'cache' => [
			'class' => 'yii\caching\FileCache',
		],
		'queue' => [
			'class'     => \yii\queue\db\Queue::class,
			'db'        => 'db', // DB connection component or its config
			'tableName' => '{{%queue}}', // Table name
			'channel'   => 'default', // Queue channel key
			'mutex'     => \yii\mutex\MysqlMutex::class, // Mutex used to sync queries
		],

	],
];
