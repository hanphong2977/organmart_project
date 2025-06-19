import api from './api';
import { Category } from '@/types';

export const fetchCategories = async (): Promise<Category[]> => {
    const res = await api.get('api/categories');
    const baseUrl = api.defaults.baseURL!;
    return res.data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        image_url: baseUrl + cat.image_url,
    }));
};
