<?php

use App\Http\Controllers\OrderViewController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryViewController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductViewController;
use App\Http\Controllers\RecipeViewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', [AuthController::class, 'login_admin']);
Route::post('/logout', [AuthController::class, 'logout_admin'])->name('logout');

// Route bảo vệ bằng Sanctum middleware
Route::middleware(['web','auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
    Route::get('/categories', function () {
        return Inertia::render('Admin/Categories');
    })->name('admin.categories');
    Route::get('/products', function () {
        return Inertia::render('Admin/Products');
    })->name('admin.products');
    // Route::get('/orders', function () {
    //     return Inertia::render('Admin/Orders');
    // })->name('admin.orders');
    Route::get('/orders', [OrderViewController::class, 'index'])->name('admin.orders');
    Route::post('/orders/{id}/update-status', [OrderViewController::class, 'updateStatus'])->name('orders.updateStatus');
    Route::get('/recipes', function () {
        return Inertia::render('Admin/Recipes');
    })->name('admin.recipes');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
});

// Login form route
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('dashboard');
});
