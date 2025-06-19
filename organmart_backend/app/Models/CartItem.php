<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
    ];
    protected $table = 'cart_items';
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
    public function getTotalPriceAttribute()
    {
        return $this->product->price * $this->quantity;
    }
    public function getFormattedPriceAttribute()
    {
        return number_format($this->total_price, 0, ',', '.');
    }
}
