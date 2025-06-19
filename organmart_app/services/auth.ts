import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';
import { router } from 'expo-router';

export const login = async (username: string, password: string) => {
    const res = await api.post('api/login', { username, password });
    await AsyncStorage.setItem('token', res.data.token);

    const user = await getUser();
    await AsyncStorage.setItem('user', JSON.stringify(user));

    router.replace('/'); // hoặc router.replace('/profile') nếu bạn muốn chuyển trang
};

export const register = async (data: {
    username: string;
    password: string;
    phone: string;
}) => {
    const res = await api.post('api/register', data);
    await AsyncStorage.setItem('token', res.data.token);

    const user = await getUser();
    await AsyncStorage.setItem('user', JSON.stringify(user));

    router.replace('/');
};

export const logout = async () => {
    await api.post('api/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
};

export const getUser = async () => {
    const res = await api.get('api/user');
    return res.data;
};
