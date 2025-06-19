// services/searchService.ts
import api from './api';
import { Product, Recipe } from '@/types';

const baseUrl = api.defaults.baseURL!;

export const mapProduct = (pro: any): Product => ({
    id: pro.id,
    name: pro.name,
    price: parseFloat(pro.price),
    description: pro.description ?? '',
    stock_quantity: pro.stock_quantity ?? 0,
    category_id: pro.category_id,
    image_url: pro.image_url ? baseUrl + pro.image_url : baseUrl + '/images/default.jpg',
});

export const mapRecipe = (r: any): Recipe => ({
    id: r.id,
    name: r.name,
    ingredients: r.ingredients,
    instructions: r.instructions,
    image_url: r.image_url ? baseUrl + r.image_url : baseUrl + '/images/default.jpg',
});

export const searchKeyword = async (
    keyword: string
): Promise<{ products: Product[]; recipes: Recipe[] }> => {
    const res = await api.get('/api/search', { params: { keyword } });
    return {
        products: res.data.products.map(mapProduct),
        recipes: res.data.recipes.map(mapRecipe),
    };
};
