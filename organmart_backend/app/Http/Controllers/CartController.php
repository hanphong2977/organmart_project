<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1'
        ]);

        $user = $request->user(); // auth user

        // Tìm hoặc tạo giỏ hàng cho user
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        // Tìm sản phẩm trong cart
        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            // Nếu đã có, cập nhật số lượng
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            // Nếu chưa có, tạo mới
            CartItem::create([
                'cart_id'    => $cart->id,
                'product_id' => $request->product_id,
                'quantity'   => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Added to cart successfully']);
    }

    public function getCart(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $cart = Cart::where('user_id', $user->id)
                ->with(['cartItems.product'])  // CHỖ NÀY PHẢI ĐÚNG TÊN QUAN HỆ TRONG MODEL
                ->first();

            if (!$cart || $cart->cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty', 'data' => []], 200);
            }

            $items = $cart->cartItems->map(function ($item) {
                return [
                    'id'         => $item->id,
                    'product_id' => $item->product->id ?? null,
                    'name'       => $item->product->name ?? 'N/A',
                    'price'      => $item->product->price ?? 0,
                    'image_url'      => $item->product->image_url ?? null,
                    'quantity'   => $item->quantity,
                    'total'      => ($item->product->price ?? 0) * $item->quantity,
                ];
            });

            return response()->json([
                'message' => 'Cart retrieved successfully',
                'data'    => $items,
                'total_price' => $cart->total_price,
                'formatted_total' => $cart->formatted_price,
            ], 200);
        } catch (Throwable $e) {
            Log::error('Failed to get cart: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to load cart'], 500);
        }
    }

    public function removeItem($id, Request $request)
    {
        $user = $request->user();

        // Tìm cart của user
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // Tìm item theo ID và xác nhận nó thuộc về cart của user
        $item = CartItem::where('id', $id)->where('cart_id', $cart->id)->first();

        if (!$item) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Cart item removed successfully']);
    }

    public function updateItem($id, Request $request)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0'
        ]);

        $user = $request->user();

        // Tìm giỏ hàng của user
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // Tìm cart item thuộc về giỏ hàng đó
        $item = CartItem::where('id', $id)->where('cart_id', $cart->id)->first();

        if (!$item) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        // Nếu quantity = 0 thì xoá luôn
        if ($request->quantity == 0) {
            $item->delete();
            return response()->json(['message' => 'Cart item removed (quantity = 0)']);
        }

        // Cập nhật số lượng
        $item->quantity = $request->quantity;
        $item->save();

        return response()->json(['message' => 'Cart item updated successfully']);
    }
}
