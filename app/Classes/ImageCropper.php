<?php

namespace App\Classes;

use Image;

class ImageCropper
{
	private $image;

	public static function make($image)
	{
		$imageCropper = new Self;
		$imageCropper->image = Image::make(file_get_contents($image));
		return $imageCropper;
	}

	public function resizeByWidth($width)
	{
		$this->image->resize($width, null, function($constraint) {
			$constraint->aspectRatio();
		});
		return $this;
	}

	public function percentageCrop($width, $height, array $coordinates = null)
	{
		$cropWidth = round( $this->image->width() * $width );
		$cropHeight = round( $this->image->height() * $height ) ;

		if($this->image->height() < $cropHeight) {
			$cropHeight = $this->image->height();
		}


		$maxCoordinatePercentageWidth = 1 - $width;
		$maxCoordinatePercentageHeight = ( 100 / $this->image->height() ) * ($this->image->height() - $cropHeight ) / 100;

		if($coordinates[0] > $maxCoordinatePercentageWidth ) {
			$coordinates[0] = $maxCoordinatePercentageWidth;
			// dd('coordinates are to high. Max percentage for width: ' . $maxCoordinatePercentageWidth);
		}

		if($coordinates[1] <= 0) {
			$coordinates[1] = 0;
		} elseif($coordinates[1] > $maxCoordinatePercentageHeight ) {
			$coordinates[1] = $maxCoordinatePercentageHeight;
			// dd('coordinates are to high. Max percentage for height: ' . $maxCoordinatePercentageHeight);
		}


		if($coordinates != null){
			$x = round( ( $this->image->width() * $coordinates[0] ) );
			$y = round( ( $this->image->height() * $coordinates[1] ) );
			$this->image->crop($cropWidth, $cropHeight, $x, $y);
		}else{
			$this->image->crop($cropWidth, $cropHeight);
		}

		return $this->image;
	}



}