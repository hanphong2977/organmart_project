<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Lấy danh sách tất cả sản phẩm cùng với thông tin category
    public function index()
    {
        $products = Product::with('category')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($products);
    }

    public function create()
    {
        return response()->json(['message' => 'Use POST request to create product.']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock_quantity' => 'required|integer',
            'image_url' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->has('image_url')) {
            $imageData = $request->input('image_url');
            $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
            $imageData = str_replace(' ', '+', $imageData);
            $image = base64_decode($imageData);

            $imageName = uniqid('product_') . '.png';
            Storage::put("public/images/$imageName", $image);
            $validated['image_url'] = "storage/images/$imageName";
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::with('category')->find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function edit($id)
    {
        return response()->json(['message' => 'Use PUT request to update product.']);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'stock_quantity' => 'nullable|integer',
            'image_url' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        if ($request->has('image_url') && str_starts_with($request->input('image_url'), 'data:image')) {
            $imageData = $request->input('image_url');
            $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
            $imageData = str_replace(' ', '+', $imageData);
            $image = base64_decode($imageData);

            // Xoá ảnh cũ nếu có
            if ($product->image_url) {
                $oldPath = public_path($product->image_url);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            $imageName = uniqid('product_') . '.png';
            Storage::put("public/images/$imageName", $image);
            $validated['image_url'] = "storage/images/$imageName";
        } else {
            // Không phải ảnh mới, giữ nguyên ảnh cũ
            unset($validated['image_url']);
        }

        $product->update($validated);
        return response()->json(['message' => 'Product updated successfully']);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        if ($product->image_url) {
            $oldPath = public_path($product->image_url);
            if (file_exists($oldPath)) {
                unlink($oldPath);
            }
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function searchByCategory(Request $request, $category_id)
    {
        $perPage = $request->query('per_page', 6);
        $products = Product::where('category_id', $category_id)
            ->with('category')
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        return response()->json($products);
    }
}
