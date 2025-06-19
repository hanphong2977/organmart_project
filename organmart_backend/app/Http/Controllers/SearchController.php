<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Recipe;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $keyword = $request->input('keyword');

        if (!$keyword) {
            return response()->json([
                'products' => [],
                'recipes' => [],
            ]);
        }

        // Tìm kiếm sản phẩm theo tên
        $products = Product::where('name', 'LIKE', '%' . $keyword . '%')->get();

        // Tìm kiếm công thức theo tên
        $recipes = Recipe::where('name', 'LIKE', '%' . $keyword . '%')->get();

        return response()->json([
            'products' => $products,
            'recipes' => $recipes,
        ]);
    }
}
