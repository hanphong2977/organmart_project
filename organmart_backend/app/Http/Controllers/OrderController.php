<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with(['orderItems.product', 'user'])
            ->latest()
            ->paginate(5);

        $formattedOrders = $orders->getCollection()->map(function ($order) {
            return [
                'id' => $order->id,
                'status' => $order->status,
                'total' => $order->total,
                'created_at' => $order->created_at->format('d/m/Y'),
                'payment_method' => $order->payment_method,
                'delivery_address' => $order->delivery_address,
                'user' => [
                    'username' => $order->user->username ?? '',
                    'phone' => $order->user->phone ?? '',
                ],
                'orderItems' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'product' => [
                            'id' => $item->product->id,
                            'name' => $item->product->name,
                            'image_url' => $item->product->image_url ?? null,
                        ],
                    ];
                }),
            ];
        });

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'orders' => $formattedOrders,
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string',
            'delivery_address' => 'required|string',
        ]);

        $user = $request->user();
        $items = $validated['items'];
        $total = 0;

        DB::beginTransaction();

        try {
            $order = $user->orders()->create([
                'status' => 'pending',
                'total' => 0,
                'payment_method' => $validated['payment_method'],
                'delivery_address' => $validated['delivery_address'],
            ]);

            foreach ($items as $item) {
                $product = Product::find($item['product_id']);
                $lineTotal = $product->price * $item['quantity'];
                $total += $lineTotal;

                $order->orderItems()->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
            }

            $order->update(['total' => $total]);

            // Xóa sản phẩm trong giỏ hàng
            $cart = Cart::where('user_id', $user->id)->first();
            if ($cart) {
                $productIds = collect($items)->pluck('product_id');
                CartItem::where('cart_id', $cart->id)
                    ->whereIn('product_id', $productIds)
                    ->delete();
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('orderItems.product'),
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Order creation failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Request $request, $id)
    {
        $order = Order::with(['orderItems.product', 'user'])
            ->where('id', $id)
            ->firstOrFail();


        return response()->json([
            'message' => 'Order retrieved successfully',
            'order' => [
                'id' => $order->id,
                'status' => $order->status,
                'total' => $order->total,
                'payment_method' => $order->payment_method,
                'delivery_address' => $order->delivery_address,
                'user' => [
                    'username' => $order->user->username ?? '',
                    'phone' => $order->user->phone ?? '',
                ],
                'orderItems' => $order->orderItems,
            ],
        ]);
    }

    public function cancel($id)
    {
        $order = Order::findOrFail($id);

        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Chỉ có thể hủy đơn hàng khi trạng thái là pending.'
            ], 400);
        }

        $order->status = 'canceled';
        $order->save();

        return response()->json([
            'message' => 'Đơn hàng đã được hủy thành công.',
            'order' => [
                'id' => $order->id,
                'status' => $order->status,
                'total' => $order->total,
                'payment_method' => $order->payment_method,
                'delivery_address' => $order->delivery_address,
                'user' => [
                    'username' => $order->user->username ?? '',
                    'phone' => $order->user->phone ?? '',
                ],
                'orderItems' => $order->orderItems,
            ],
        ]);
    }
}
