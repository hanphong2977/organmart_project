<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    //
    // Lấy danh sách tất cả công thức nấu ăn
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 6); // Mặc định 6 công thức mỗi trang
        $recipes = Recipe::orderByDesc('created_at')->paginate($perPage);

        return response()->json($recipes);
    }
    // Tạo mới công thức nấu ăn
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'instructions' => 'required|string',
            'ingredients' => 'required|string',
            'image_url' => 'nullable|string', // Dữ liệu ảnh base64
        ]);

        // Xử lý ảnh base64 nếu có
        if ($request->has('image_url')) {
            $imageData = $request->input('image_url');
            $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
            $imageData = str_replace(' ', '+', $imageData);
            $image = base64_decode($imageData);

            $imageName = uniqid('recipe_') . '.png';
            Storage::put("public/images/$imageName", $image);
            $validated['image_url'] = "storage/images/$imageName";
        }

        $recipe = Recipe::create($validated);
        return response()->json($recipe, 201);
    }
    // Hiển thị thông tin công thức nấu ăn theo ID
    public function show($id)
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
        return response()->json($recipe);
    }
    // Cập nhật công thức nấu ăn theo ID
    public function update(Request $request, $id)
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'instructions' => 'sometimes|required|string',
            'ingredients' => 'sometimes|required|string',
            'image_url' => 'sometimes|nullable|string', // Dữ liệu ảnh base64
        ]);

        // Xử lý ảnh base64 nếu có
        if ($request->has('image_url') && str_starts_with($request->input('image_url'), 'data:image')) {
            $imageData = $request->input('image_url');
            $imageData = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
            $imageData = str_replace(' ', '+', $imageData);
            $image = base64_decode($imageData);

            // Xoá ảnh cũ nếu có
            if ($recipe->image_url) {
                $oldPath = public_path($recipe->image_url);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            $imageName = uniqid('recipe_') . '.png';
            Storage::put("public/images/$imageName", $image);
            $validated['image_url'] = "storage/images/$imageName";
        }else {
            // Không phải ảnh mới, giữ nguyên ảnh cũ
            unset($validated['image_url']);
        }

        $recipe->update($validated);
        return response()->json($recipe);
    }
    // Xóa công thức nấu ăn theo ID
    public function destroy($id)
    {
        $recipe = Recipe::find($id);
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $recipe->delete();
        return response()->json(['message' => 'Recipe deleted successfully']);
    }
    // Tìm kiếm công thức nấu ăn theo tên
    public function searchByName(Request $request)
    {
        $query = $request->input('query');
        $recipes = Recipe::where('name', 'LIKE', "%$query%")->get();
        return response()->json($recipes);
    }
    // // Tìm kiếm công thức nấu ăn theo nguyên liệu
    // public function searchByIngredient(Request $request)
    // {
    //     $ingredient = $request->input('ingredient');
    //     $recipes = Recipe::where('ingredients', 'LIKE', "%$ingredient%")->get();
    //     return response()->json($recipes);
    // }

    public function random_six_recipes()
    {
        try {
            $recipes = Recipe::inRandomOrder()->take(6)->get();

            // Kiểm tra xem có đủ dữ liệu không và đúng định dạng
            if ($recipes->count() === 6 && $this->checkRecipeFormat($recipes)) {
                // Cache lại kết quả ổn định trong 10 phút
                Cache::put('cached_random_recipes', $recipes, now()->addMinutes(10));
                return response()->json(['success' => true,'message' => 'Dữ liệu ổn định', 'data' => $recipes]);
            }

            // Nếu không đủ hoặc sai định dạng, trả dữ liệu từ cache
            if (Cache::has('cached_random_recipes')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Dữ liệu không ổn định. Trả về bản cache.',
                    'data' => Cache::get('cached_random_recipes'),
                ]);
            }

            // Trường hợp xấu nhất, trả danh sách rỗng
            return response()->json([
                'success' => false,
                'message' => 'Không lấy được dữ liệu phù hợp và không có bản cache.',
                'data' => [],
            ]);
        } catch (Exception $e) {
            // Xử lý lỗi hệ thống
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi: ' . $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    private function checkRecipeFormat($recipes)
    {
        foreach ($recipes as $recipe) {
            if (!isset($recipe->id) || !isset($recipe->name) || !isset($recipe->ingredients) || !isset($recipe->instructions) || !isset($recipe->image_url)) {
                return false;
            }
        }
        return true;
    }
}
