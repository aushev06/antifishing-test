<?php

declare(strict_types=1);

namespace backend\services;

use backend\providers\CsvDataProvider;
use SplFileObject;
use Yii;

class GetDataService
{
	/**
	 * @return CsvDataProvider
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public function getData()
	{
		$path = Yii::getAlias('@webroot') . '/data.csv';

		$dataProvider = new CsvDataProvider([
			'filename'   => $path,
			'pagination' => [
				'pageSize' => 10,
			],
		]);

		return $dataProvider;

	}


}