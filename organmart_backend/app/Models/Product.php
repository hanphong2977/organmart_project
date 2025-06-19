<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';


    // Cho phép gán hàng loạt các trường sau
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock_quantity',
        'image_url',
        'category_id',
    ];

    // Sản phẩm thuộc về một danh mục
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Sản phẩm có nhiều nhà cung cấp
    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }
}
