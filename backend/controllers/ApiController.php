<?php


namespace backend\controllers;


use yii\filters\Cors;
use yii\rest\Controller;

class ApiController extends Controller
{
	public function behaviors()
	{
		$behaviors = parent::behaviors();

		// add CORS filter
		$behaviors['corsFilter'] = [
			'class' => Cors::class,
			'cors'  => [
				'Origin'                         => ['*'],
				'Access-Control-Request-Method'  => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
				'Access-Control-Request-Headers' => ['*'],
			],

		];
		return $behaviors;
	}
}