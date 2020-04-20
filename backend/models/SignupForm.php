<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\User;

/**
 * Signup form
 */
class SignupForm extends Model
{
	public $username;
	public $email;
	public $password;
	/**
	 * @var User
	 */
	private $user;


	public function __construct(User $user, $config = [])
	{
		$this->user = $user;
		parent::__construct($config);

	}

	/**
	 * {@inheritdoc}
	 */
	public function rules()
	{
		return [
			['username', 'trim'],
			['username', 'required'],
			['username',
			 'unique',
			 'targetClass' => '\common\models\User',
			 'message'     => 'This username has already been taken.'],
			['username', 'string', 'min' => 2, 'max' => 255],

			['email', 'trim'],
			['email', 'required'],
			['email', 'email'],
			['email', 'string', 'max' => 255],
			['email',
			 'unique',
			 'targetClass' => '\common\models\User',
			 'message'     => 'This email address has already been taken.'],

			['password', 'required'],
			['password', 'string', 'min' => 6],
		];
	}

	/**
	 * @return string
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function formName()
	{
		return '';
	}

	/**
	 * Signs user up.
	 *
	 * @return bool whether the creating new account was successful and email was sent
	 */
	public function signup()
	{
		if (false === $this->validate()) {
			return false;
		}


		$user           = $this->user;
		$user->username = $this->username;
		$user->email    = $this->email;
		$user->setPassword($this->password);
		$user->status = $user::STATUS_ACTIVE;
		$user->generateAuthKey();
		$user->generateEmailVerificationToken();
		$user->generateToken();


		return $user->save();

	}

}
