<?php

namespace frontend\assets;

use frontend\helpers\AssetHelper;
use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
	public $basePath = '@webroot';
	public $baseUrl  = '@web';
	public $css      = [
		'css/site.css',
	];
	public $js       = [
//    	'build/js/app.js'
	];
	public $depends  = [
		'yii\web\YiiAsset',
		'yii\bootstrap\BootstrapAsset',
	];

	public function __construct($config = [])
	{
		$appJs    = AssetHelper::include('js/app.js');
		$appCss   = AssetHelper::include('css/index.css');
		$this->js = [
			$appJs
		];

		$this->css = [
			$appCss
		];

		parent::__construct($config);
	}

}
