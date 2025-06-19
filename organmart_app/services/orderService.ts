// services/orderService.ts
import api from './api';
import { Order, OrderItemInput } from '@/types';

const mapOrderItems = (items: any[]): Order['orderItems'] => {
    return items.map(item => ({
        id: item.id,
        order_id: item.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: item.product,
    }));
};

const mapOrders = (data: any[]): Order[] => {
    return data.map(order => ({
        id: order.id,
        user_id: order.user_id,
        status: order.status,
        total: parseFloat(order.total),
        created: order.created_at,
        payment_method: order.payment_method,
        delivery_address: order.delivery_address,
        orderItems: mapOrderItems(order.orderItems || []),
    }));
};

export const getOrders = async (page: number = 1): Promise<{ orders: Order[], pagination: any }> => {
    const response = await api.get(`api/orders?page=${page}`);
    const rawData = response.data;
    return {
        orders: mapOrders(rawData.orders),
        pagination: rawData.pagination,
    };
};

export const getOrderById = async (orderId: number): Promise<Order> => {
    const response = await api.get(`api/orders/${orderId}`);
    const order = response.data.order;
    return {
        ...order,
        total: parseFloat(order.total),
        orderItems: mapOrderItems(order.orderItems || []),
    };
};

// Update createOrder để nhận thêm các trường khác, trả về Order
export const createOrder = async (orderPayload: {
    items: OrderItemInput[],
    payment_method: string,
    delivery_address: string
}): Promise<Order> => {
    try {
        const response = await api.post('api/orders',  orderPayload );
        const order = response.data.order;
        return {
            ...order,
            total: parseFloat(order.total),
            orderItems: mapOrderItems(order.orderItems || []),
        };
    } catch (error: any) {
        console.log('Validation error:', error.response?.data);
        throw error;
    }
};

export const cancelOrder = async (id: number) => {
    const response = await api.put(`api/orders/${id}/cancel`);
    const order = response.data.order;
    return {
        ...order,
        total: parseFloat(order.total),
        orderItems: mapOrderItems(order.orderItems || []),
    };
};

