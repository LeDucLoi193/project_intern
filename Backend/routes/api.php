<?php

use App\Models\Requestt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RequesttController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("user-signup", "App\Http\Controllers\Api\UserController@userSignUp");

Route::post("user-login", "App\Http\Controllers\Api\UserController@userLogin");

Route::get("user/{email}", "App\Http\Controllers\Api\UserController@userDetail");

Route::apiResource('request', 'App\Http\Controllers\Api\RequestController');

Route::apiResource('user', 'App\Http\Controllers\Api\UserController');
Route::get('alluser','App\Http\Controllers\Api\UserController@index_2');
Route::get('user/index/{id}','App\Http\Controllers\Api\UserController@show');
Route::put('user/update/{id}','App\Http\Controllers\Api\UserController@update');
Route::delete('user/delete/{id}','App\Http\Controllers\Api\UserController@destroy');
// Route::delete('request/delete/{id}','App\Http\Controllers\Api\RequestController@destroy');
Route::get('request/index/{id}','App\Http\Controllers\Api\RequestController@index_1');
Route::put('request/update/{id}','App\Http\Controllers\Api\RequestController@update');
Route::get('user/test','App\Http\Controllers\Api\UserController@show_user');
Route::get('user/detail/{id}','App\Http\Controllers\Api\UserController@show');
Route::apiResource('request/comment', 'App\Http\Controllers\Api\CommentController');
Route::get('request/comment/sum_request/{id}','App\Http\Controllers\Api\RequestController@sum_request');
Route::get('request/comment/{id}','App\Http\Controllers\Api\CommentController@show');
Route::post('comment/update/{id}','App\Http\Controllers\Api\CommentController@update');
Route::post('comment/create','App\Http\Controllers\Api\CommentController@store');
