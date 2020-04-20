<?php

namespace backend\controllers;

use app\models\db\EmailLog;
use backend\dto\CsvItem;
use backend\dto\Pagination;
use backend\services\GetDataService;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use common\models\LoginForm;
use yii\rest\Controller;

/**
 * Site controller
 */
class SiteController extends ApiController
{
	/**
	 * @var GetDataService
	 */
	private $service;

	public function __construct($id, $module, GetDataService $service, $config = [])
	{
		$this->service = $service;
		parent::__construct($id, $module, $config);
	}

	/**
	 * {@inheritdoc}
	 */
	public function behaviors()
	{
		$behaviors                                 = parent::behaviors();
		$behaviors['authenticator']['authMethods'] = [
			HttpBearerAuth::class,
		];

		return $behaviors;
	}

	/**
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function actionIndex()
	{
		$dataProvider = $this->service->getData();

		$pagination        = new Pagination;
		$pagination->count = $dataProvider->count;
		$pagination->pages = floor($dataProvider->getTotalCount() / 10);

		$result = [];

		foreach ($dataProvider->getModels() as $key => $model) {
			if ($model[0] === 'dataKey') {
				continue;
			}

			$item                   = new CsvItem();
			$item->dataKey          = $model[0] ?? 'Не заполнено';
			$item->first_name       = $model[1] ?? 'Не заполнено';
			$item->second_name      = $model[2] ?? 'Не заполнено';
			$item->third_name       = $model[3] ?? 'Не заполнено';
			$item->department       = $model[4] ?? 'Не заполнено';
			$item->position         = $model[5] ?? 'Не заполнено';
			$item->guid             = $model[6] ?? 'Не заполнено';
			$item->exists           = $model[7] ?? 'Не заполнено';
			$item->has_changes      = $model[8] ?? 'Не заполнено';
			$item->email            = $model[9] ?? 'Не заполнено';
			$item->ldap_login       = $model[10] ?? 'Не заполнено';
			$item->ldap_profile_id  = $model[11] ?? 'Не заполнено';
			$item->marks            = $model[12] ?? 'Не заполнено';
			$item->ldap_external_id = $model[13] ?? 'Не заполнено';

			$result[] = $item;
		}

		return [
			'pagination' => $pagination,
			'data'       => $result
		];

	}

	public function actionSend()
	{
		$data = Yii::$app->request->getBodyParams()['selection'];

		$db = Yii::$app->db->beginTransaction();

		try {
			foreach ($data as $datum) {
				$item         = json_decode($datum);
				$email        = new EmailLog();
				$email->email = $item->email;
				$email->text  = Yii::$app->request->post('text');
				$email->save();
			}


			$db->commit();
			return [
				'success' => true,
			];

		} catch (\Throwable $exception) {

			$db->rollBack();
			Yii::$app->response->setStatusCode(500);
			return [
				'success' => false,
				'error'   => $exception->getMessage()
			];
		}

	}

	/**
	 * @return EmailLog[]|array
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function actionEmails()
	{
		return EmailLog::find()->all();
	}
}
