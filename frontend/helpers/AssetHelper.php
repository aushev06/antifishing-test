<?php

declare(strict_types=1);

namespace frontend\helpers;

use yii\base\InvalidCallException;

class AssetHelper
{
	/**
	 * @param string $filename
	 * @return string
	 * @author Aushev Ibra <aushevibra@yandex.ru>
	 */
	public static function include(string $filename): string
	{
		$filepath = \Yii::getAlias("@frontend/web/build/{$filename}");
		$newName  = strstr($filepath, 'build');

		if (false === file_exists($filepath)) {
			throw new InvalidCallException();
		}

		$timestamp = @filemtime($filepath);

		return sprintf('%s?v=%d', $newName, $timestamp);
	}
}