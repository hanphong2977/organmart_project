<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $table = 'suppliers';
    // Các trường cho phép gán dữ liệu hàng loạt
    protected $fillable = [
        'name',
        'phone',
        'address',
    ];

    // Một nhà cung cấp có nhiều sản phẩm
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
