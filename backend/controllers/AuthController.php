<?php


namespace backend\controllers;


use backend\models\SignupForm;
use common\models\LoginForm;
use common\models\User;
use Yii;

class AuthController extends ApiController
{


	/**
	 * {@inheritdoc}
	 */
	public function actions()
	{
		return [
			'error' => [
				'class' => 'yii\web\ErrorAction',
			],
		];
	}

	/**
	 * Displays homepage.
	 *
	 * @return string
	 */
	public function actionIndex()
	{
		return $this->render('index');
	}


	/**
	 * @return array|LoginForm
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function actionLogin()
	{

		$model = new LoginForm();

		if ($model->load(Yii::$app->request->post()) && $model->login()) {
			return Yii::$app->user->identity;
		}
		return $model;
	}


	/**
	 * @return SignupForm|User
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function actionSignup()
	{
		$user = new User();
		$form = new SignupForm($user);


		if ($form->load(Yii::$app->request->post()) && $form->signup()) {
			return $user;
		}

		return $form;
	}

	/**
	 * @return \yii\web\IdentityInterface|null
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function actionMe()
	{
		$token = Yii::$app->request->headers->get('Authorization');
		$token = trim(str_replace('Bearer ', '', $token));
		return User::findIdentityByAccessToken($token);
	}
}