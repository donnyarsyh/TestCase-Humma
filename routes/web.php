<?php

use App\Http\Controllers\CatatanController;
use App\Http\Controllers\DataUserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LoginController::class, 'create'])->name('login');
Route::post('/login', [LoginController::class, 'store'])->name('login.store');
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');

Route::get('/catatan', [CatatanController::class, 'index'])
    ->middleware(['auth'])
    ->name('catatan');
Route::delete('/catatan/{idcatatan}', [CatatanController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('catatan.destroy');

Route::get('/datauser', [DataUserController::class, 'index'])
    ->middleware(['auth'])
    ->name('datauser');
Route::delete('/users/{id}', [DataUserController::class, 'destroy'])
    ->name('users.destroy')
    ->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
