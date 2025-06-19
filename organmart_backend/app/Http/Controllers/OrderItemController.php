<?php
namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index($orderId)
    {
        $items = OrderItem::with('product')
            ->where('order_id', $orderId)
            ->get();

        return response()->json([
            'message' => 'Order items retrieved successfully',
            'items' => $items,
        ]);
    }

    public function show($id)
    {
        $item = OrderItem::with('product', 'order')->findOrFail($id);

        return response()->json([
            'message' => 'Order item retrieved successfully',
            'item' => $item,
        ]);
    }
}

