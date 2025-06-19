import api from './api';
import { LibraryItem, Recipe } from '@/types';

const baseUrl = api.defaults.baseURL!;

// Hàm chuẩn hóa recipe
const mapRecipe = (r: any): Recipe => ({
    id: r.id,
    name: r.name,
    ingredients: r.ingredients,
    instructions: r.instructions,
    image_url: r.image_url ? baseUrl + r.image_url : baseUrl + '/images/default.jpg',
});

// Hàm chuẩn hóa dữ liệu trả về từ API
const mapLibraryItem = (item: any): LibraryItem => ({
    id: item.id,
    recipe_id: item.recipe_id,
    user_id: item.user_id,
    recipe: item.recipe ? mapRecipe(item.recipe) : undefined,
});

// Lấy danh sách các mục trong thư viện
export const fetchLibraryItems = async (): Promise<LibraryItem[]> => {
    const res = await api.get('/api/library-items');
    return Array.isArray(res.data) ? res.data.map(mapLibraryItem) : [];
};

// Thêm recipe vào thư viện
export const addLibraryItem = async (recipeId: number): Promise<LibraryItem> => {
    const res = await api.post('/api/library-items', { recipe_id: recipeId });
    return mapLibraryItem(res.data);
};

// Xoá một mục khỏi thư viện
export const removeLibraryItem = async (recipeId: number): Promise<void> => {
    await api.delete(`/api/library-items/${recipeId}`);
};
