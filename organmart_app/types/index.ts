export interface Category {
    id: number;
    name: string;
    image_url: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    category_id: number;
    image_url: string;
}

export interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    instructions: string;
    image_url: string;
}

export interface LibraryItem {
    id: number;
    user_id: number;
    recipe_id: number;
    recipe?: Recipe;
}

export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    name: string;
    price: number;
    image: string;
    total: number;
}

export interface OrderItemInput {
    product_id: number;
    quantity: number;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: Product;
}

export interface Order {
    id: number;
    user_id: number;
    status: string;
    total: number;
    created: Date;
    orderItems: OrderItem[];
}