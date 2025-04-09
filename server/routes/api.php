<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;

Route::post('/projects', [ProjectController::class, 'store']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);

Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);