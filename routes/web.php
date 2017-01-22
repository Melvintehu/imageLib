<?php

Route::get('/', function(){
	return view('layouts.app');
});

Route::get('/crop', 'ImageHelperController@index');
Route::resource('photo', 'PhotosController');