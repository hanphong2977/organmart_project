<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    // Các trường cho phép gán dữ liệu hàng loạt
    protected $fillable = [
        'name',
        'image_url',
    ];

    // Quan hệ 1-nhiều: Một category có nhiều products
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
