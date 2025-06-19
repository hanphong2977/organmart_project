import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';
import { getCart, removeItem } from '@/services/addToCartService';
import {useFocusEffect} from "expo-router";
import { useRouter } from 'expo-router';

const Cart = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);

    // Hàm để tải lại giỏ hàng
    const fetchCart = async () => {
        try {
            const response = await getCart();
            const data = response.data || [];
            setCartItems(data);
            const quantityMap: Record<number, number> = {};
            data.forEach((item: any) => {
                quantityMap[item.id] = item.quantity;
            });
            setQuantities(quantityMap);
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchCart khi component được mount hoặc khi người dùng quay lại trang
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchCart();
        }, [])
    );

    const handleIncrease = (id: number) => {
        setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const handleDecrease = async (id: number) => {
        const newQuantity = Math.max(quantities[id] - 1, 0);
        setQuantities((prev) => ({ ...prev, [id]: newQuantity }));

        if (newQuantity === 0) {
            try {
                await removeItem(id);  // Gọi API xóa sản phẩm khi số lượng bằng 0
                // Sau khi xóa, cập nhật lại giỏ hàng
                const updatedCart = await getCart();
                setCartItems(updatedCart.data);
            } catch (error) {
                console.error('Failed to remove item:', error);
            }
        }
    };

    const prepareOrderItems = () => {
        return cartItems.map(item => ({
            id: item.productId,
            name: item.name,
            price: item.price,
            quantity: quantities[item.id],
        }));
    };


    const total = cartItems.reduce((sum, item) => {
        return sum + item.price * (quantities[item.id] || 1);
    }, 0);

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#15803d" />
                <Text style={tw`text-green-800 mt-2`}>Loading cart...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <View style={tw`bg-green-700 py-5 px-6`}>
                <Text style={tw`text-white text-xl text-center font-semibold`}>Giỏ Hàng</Text>
            </View>

            <View style={tw`px-6 py-6`}>
                {cartItems.length === 0 ? (
                    <View style={tw`items-center justify-center py-10`}>
                        <Feather name="shopping-cart" size={48} color="#9ca3af" />
                        <Text style={tw`text-gray-500 mt-4 text-lg`}>Không có sản phẩm trong giỏ hàng</Text>
                    </View>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <View key={item.id} style={tw`flex-row bg-white p-4 mb-4 rounded-2xl shadow-sm border border-gray-100 items-center`}>
                                <Image source={{ uri: item.image }} style={tw`w-20 h-20 rounded-xl mr-4`} resizeMode="contain" />
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-green-800 font-bold text-lg`}>{item.name}</Text>
                                    <View style={tw`flex-row items-center mt-1`}>
                                        <Pressable onPress={() => handleDecrease(item.id)} style={tw`border border-green-700 rounded-full p-1`}>
                                            <Feather name="minus" size={10} color="#15803d" />
                                        </Pressable>
                                        <Text style={tw`text-green-700 text-lg font-semibold mx-2`}>{quantities[item.id]}</Text>
                                        <Pressable onPress={() => handleIncrease(item.id)} style={tw`border border-green-700 rounded-full p-1`}>
                                            <Feather name="plus" size={10} color="#15803d" />
                                        </Pressable>
                                    </View>
                                </View>
                                <Text style={tw`text-green-800 font-bold text-right`}>{item.price.toLocaleString()} VNĐ</Text>
                            </View>
                        ))}

                        {/* Summary */}
                        <View style={tw`mt-6 px-2`}>
                            <Pressable
                                onPress={() => {
                                    const orderItems = prepareOrderItems();
                                    router.push({
                                        pathname: '/Order/OrderConfirmScreen',
                                        params: {
                                            items: JSON.stringify(orderItems),
                                        },
                                    });
                                }}
                                style={tw`bg-green-700 py-4 rounded-xl items-center`}
                            >
                                <Text style={tw`text-white text-lg font-semibold`}>Thanh Toán</Text>
                            </Pressable>
                        </View>
                    </>
                )}
            </View>

            <View style={tw`h-14`} />
        </ScrollView>
    );

};

export default Cart;
