<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
	protected $fillable = [
		'filename',
		'type',
		'model_id',
	];
}
