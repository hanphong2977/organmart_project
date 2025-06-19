<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\Order;
use App\Models\Recipe;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Doanh thu trong 30 ngày gần nhất
        $totalRevenueLast30Days = Order::where('created_at', '>=', now()->subDays(30))
            ->sum('total');
        // Tổng số đơn hàng trong 30 ngày gần nhất
        $totalOrdersLast30Days = Order::where('created_at', '>=', now()->subDays(30))
            ->count();
        // Doanh thu trong tuần hiện tại (theo thứ)
        $weeklyRevenue = Order::select(
            DB::raw("DAYOFWEEK(created_at) as weekday"),
            DB::raw("SUM(total) as total")
        )
            ->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])
            ->groupBy('weekday')
            ->get()
            ->map(function ($item) {
                $weekdayMap = [
                    2 => 'Thứ 2',
                    3 => 'Thứ 3',
                    4 => 'Thứ 4',
                    5 => 'Thứ 5',
                    6 => 'Thứ 6',
                    7 => 'Thứ 7',
                    1 => 'Chủ Nhật',
                ];
                return [
                    'day' => $weekdayMap[$item->weekday],
                    'total' => $item->total,
                ];
            })->sortBy(function ($item) {
                $order = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
                return array_search($item['day'], $order);
            })->values();

        $clientsCount = User::whereHas('roles', function ($query) {
            $query->where('name', 'client');
        })->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_revenue' => $totalRevenueLast30Days,
                'orders_count' => $totalOrdersLast30Days,
                'users_count' => $clientsCount,
                'weekly_revenue' => $weeklyRevenue,
            ],
        ]);
    }
}
