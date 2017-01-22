<?php

namespace App\Http\Controllers;

use Image;
use App\Classes\ImageCropper;
use Illuminate\Http\Request;

class ImageHelperController extends Controller
{


	public function index(Request $request)
	{

		$photo = json_decode( $request->get('photo') );
		$path = public_path() . '/images/' . $photo->type . '/' . $photo->model_id . '/';

		$image = ImageCropper::make($path . $photo->filename)
			->percentageCrop(
				$request->get('width'),
				$request->get('height'), [
					$request->get('x'),
					$request->get('y')
				])->save($path . '/cropped/' . $photo->filename);

			return response()->json(['croppedImage' =>  'images/' . $photo->type . '/' . $photo->model_id . '/cropped/' . $photo->filename], 200 );
	}

}
