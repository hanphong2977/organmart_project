<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Lấy tất cả danh mục
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Không cần form cho API
        return response()->json(['message' => 'Use POST request to create a category.']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate dữ liệu gửi từ client
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'nullable|string', // Dữ liệu ảnh ở dạng base64
        ]);

        // Nếu có ảnh (base64), giải mã ảnh
        if ($request->has('image_url')) {
            $imageData = $request->input('image_url'); // Dữ liệu base64
            $imageData = str_replace('data:image/png;base64,', '', $imageData); // Nếu ảnh là PNG
            $imageData = str_replace(' ', '+', $imageData);
            $image = base64_decode($imageData);

            // Lưu file ảnh vào storage
            $imageName = uniqid('category_') . '.png'; // Đặt tên ảnh
            $path = Storage::put('public/images/' . $imageName, $image); // Lưu vào thư mục storage/app/public/images

            // Cập nhật dữ liệu cho image_url là đường dẫn tới ảnh lưu trữ
            $validated['image_url'] = 'storage/images/' . $imageName;
        }

        // Tạo mới category
        $category = Category::create($validated);

        // Trả về thông báo thành công với dữ liệu category đã tạo
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Lấy danh mục theo id
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Trả về dữ liệu category
        return response()->json($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // Không cần form cho API
        return response()->json(['message' => 'Use PUT request to update category.']);
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
        // Validate dữ liệu gửi từ client
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'image_url' => 'nullable|string', // Dữ liệu ảnh ở dạng base64 hoặc null
        ]);

        // Tìm category theo id
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Kiểm tra xem client có gửi image_url và image_url khác null, khác rỗng không
        if ($request->has('image_url') && !empty($request->input('image_url'))) {
            $imageData = $request->input('image_url'); // Dữ liệu base64

            // Nếu dữ liệu ảnh có dạng data:image/png;base64,... thì loại bỏ phần này
            if (str_starts_with($imageData, 'data:image')) {
                $imageData = preg_replace('#^data:image/\w+;base64,#i', '', $imageData);
            }
            $imageData = str_replace(' ', '+', $imageData);
            $image = base64_decode($imageData);

            // Xóa ảnh cũ nếu có
            if ($category->image_url) {
                $oldImagePath = public_path($category->image_url);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Lưu file ảnh vào storage
            $imageName = uniqid('category_') . '.png'; // Đặt tên ảnh mới
            // Lưu file ảnh dưới dạng nhị phân
            Storage::put('public/images/' . $imageName, $image);

            // Cập nhật image_url thành đường dẫn mới
            $validated['image_url'] = 'storage/images/' . $imageName;
        } else {
            // Nếu image_url không được gửi hoặc null, giữ nguyên ảnh cũ
            unset($validated['image_url']);  // Bỏ không cập nhật trường image_url
        }

        // Cập nhật category
        $category->update($validated);

        return response()->json(['message' => 'Category updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Tìm category theo id
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Xóa ảnh cũ nếu có
        if ($category->image_url) {
            $oldImagePath = public_path('storage/' . $category->image_url);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }

        // Xóa category
        $category->delete();

        // Trả về thông báo thành công
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
