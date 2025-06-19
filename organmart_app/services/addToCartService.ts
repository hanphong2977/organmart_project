import api from './api';
import {CartItem} from "@/types";

const baseUrl = api.defaults.baseURL!;

const mapCartData = (data: any[]): CartItem[] => {
    return data.map(item => ({
        id: item.id,
        productId: item.product_id,
        quantity: item.quantity,
        name: item.name,
        price: parseFloat(item.price),
        image: item.image_url ? baseUrl + item.image_url : baseUrl + '/images/default.jpg',
        total: item.total,
    }));
};

export const addToCart = async ({productId,quantity}:{productId: number; quantity: number;}) => {
    const response = await api.post(`api/cart/add`, {
        product_id: productId,
        quantity,
    })
    return response.data;
}

export const getCart = async (): Promise<{
    data: CartItem[];
    formatted_total: string;
    message: string;
    total_price: number;
}> => {
    const response = await api.get('api/cart/');
    const rawData = response.data;

    return {
        ...rawData,
        data: mapCartData(rawData.data),
    };
};

export const removeItem = async (id: number) => {
    const response = await api.delete(`api/cart/remove/${id}`);
    return response.data;
};