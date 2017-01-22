<?php

namespace App\Http\Controllers;

use App\Photo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Image;

class PhotosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $file = $request->file('file');
        $filename = Carbon::now()->toDateString() . ' ' .Carbon::now()->second . '-' . $file->getClientOriginalName();

        // save the image to the database
        $photo = Photo::create([
            'filename' => $filename,
            'type' => 'nieuws',
            'model_id' => 1,
        ]);


        $path = public_path() . '/images/' . $photo->type . '/';

        if(!is_dir($path)){
            mkdir($path);
        }


        $path = public_path() . '/images/' . $photo->type . '/' . $photo->model_id . '/';

        if(!is_dir($path)){
            mkdir($path);
        }

        if(!is_dir($path . 'cropped/') ) {
            mkdir($path . 'cropped/');
        }

        $path .= $filename;

        // optional crop the image

        // make the image
        $this->image = Image::make($file);
        $this->image->save($path);
        return $photo;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
