<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LibraryItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('categories')->group(function () {
    // Lấy danh sách tất cả danh mục: GET /categories
    Route::get('/', [CategoryController::class, 'index']);

    // Tạo mới danh mục: POST /categories
    Route::post('/', [CategoryController::class, 'store']);

    // Lấy thông tin danh mục theo id: GET /categories/{id}
    Route::get('/{id}', [CategoryController::class, 'show']);

    // Cập nhật danh mục theo id: PUT /categories/{id}
    Route::put('/{id}', [CategoryController::class, 'update']);

    // Xóa danh mục theo id: DELETE /categories/{id}
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});


Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);         // GET /api/products
    Route::post('/', [ProductController::class, 'store']);        // POST /api/products
    Route::get('/{id}', [ProductController::class, 'show']);      // GET /api/products/{id}
    Route::put('/{id}', [ProductController::class, 'update']);    // PUT /api/products/{id}
    Route::delete('/{id}', [ProductController::class, 'destroy']); // DELETE /api/products/{id}
    Route::get('/category/{category_id}', [ProductController::class, 'searchByCategory']); // GET /api/products/category/{categoryId}
});

Route::prefix('recipes')->group(function () {
    Route::get('/', [RecipeController::class, 'index']);         // GET /api/recipes
    Route::post('/', [RecipeController::class, 'store']);        // POST /api/recipes
    Route::get('/{id}', [RecipeController::class, 'show']);      // GET /api/recipes/{id}
    Route::put('/{id}', [RecipeController::class, 'update']);    // PUT /api/recipes/{id}
    Route::delete('/{id}', [RecipeController::class, 'destroy']); // DELETE /api/recipes/{id}
    Route::get('/random/random-recipes', [RecipeController::class, 'random_six_recipes']);
});

Route::middleware('auth:sanctum')->prefix('cart')->group(function () {
    Route::post('/add', [CartController::class, 'addToCart']);              // POST /api/cart/add
    Route::get('/', [CartController::class, 'getCart']);                    // GET /api/cart
    Route::put('/update/{id}', [CartController::class, 'updateItem']);      // PUT /api/cart/update/{id}
    Route::delete('/remove/{id}', [CartController::class, 'removeItem']);   // DELETE /api/cart/remove/{id}
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->prefix('library-items')->group(function () {
    Route::get('/',     [LibraryItemController::class, 'index']);
    Route::post('/',    [LibraryItemController::class, 'store']);
    Route::get('/{id}', [LibraryItemController::class, 'show']);
    Route::put('/{id}', [LibraryItemController::class, 'update']);
    Route::delete('/{id}', [LibraryItemController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);

    Route::get('/orders/{orderId}/items', [OrderItemController::class, 'index']);
    Route::get('/order-items/{id}', [OrderItemController::class, 'show']);
    Route::put('/orders/{id}/cancel', [OrderController::class, 'cancel']);

});

Route::get('/search',[SearchController::class,'search']);
