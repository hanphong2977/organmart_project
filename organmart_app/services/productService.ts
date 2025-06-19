import api from './api';
import { Product } from '@/types';

const baseUrl = api.defaults.baseURL!;

// ----- Hàm chuyển dữ liệu raw từ API về Product chuẩn -----
const mapProduct = (pro: any): Product => ({
    id: pro.id,
    name: pro.name,
    price: parseFloat(pro.price),
    description: pro.description ?? '',
    stock_quantity: pro.stock_quantity ?? 0,
    category_id: pro.category_id,
    image_url: pro.image_url ? baseUrl + pro.image_url : baseUrl + '/images/default.jpg',
});

// ----- Lấy tất cả sản phẩm -----
export const fetchProducts = async (): Promise<Product[]> => {
    const res = await api.get('api/products');
    return res.data.map(mapProduct);
};

// ----- Lấy sản phẩm theo ID -----
export const fetchProductById = async (id: number): Promise<Product> => {
    const res = await api.get(`api/products/${id}`);
    return mapProduct(res.data);
};

// ----- Lấy sản phẩm theo category + phân trang -----
export const fetchProductsByCategory = async (
    categoryId: number,
    page: number = 1
): Promise<{ products: Product[]; total: number }> => {
    const res = await api.get(`api/products/category/${categoryId}`, {
        params: { page, per_page: 6 },
    });

    const items = res.data.data;

    return {
        products: items.map(mapProduct),
        total: res.data.total,
    };
};
