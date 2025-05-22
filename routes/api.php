<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatatanController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/catatan/{user_id}', [CatatanController::class, 'index']);
Route::post('/upload_gambar', [CatatanController::class, 'uploadGambar']);
Route::delete('catatan/{id}', [CatatanController::class, 'destroy']);
Route::put('/catatan/{id}', [CatatanController::class, 'update']);
Route::middleware('auth:sanctum')->put('/update', [AuthController::class, 'updateProfile']);
Route::post('/update-password', [AuthController::class, 'updatePassword']);
Route::get('/check-hint', [AuthController::class, 'check']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/catatan', [CatatanController::class, 'store']);
