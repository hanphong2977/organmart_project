<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderViewController extends Controller
{
    public function index(Request $request)
    {
        // Lấy danh sách đơn hàng, kèm user, phân trang 10 bản ghi mỗi trang
        $orders = Order::orderBy('created_at', 'desc')->paginate(10);
        $orders->getCollection()->transform(function ($order) {
            $user = User::find($order->user_id);
            $order->user_name = $user ? $user->username : null;
            return $order;
        });
        // Trả về view Inertia, truyền dữ liệu orders
        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,completed,delivered,canceled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return back()->with('success', 'Cập nhật trạng thái thành công.');
    }
}
