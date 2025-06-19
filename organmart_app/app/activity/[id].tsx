import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { getOrderById, cancelOrder } from '@/services/orderService';
import { Order } from '@/types';

const orderStatusSteps = [
    'Đơn hàng của bạn đã được xác nhận',
    'Đơn hàng đang được xử lý và đóng gói',
    'Đơn hàng đã được đóng gói',
    'Đơn hàng đang được giao đến bạn',
    'Giao hàng thành công',
];

// Xác định bước hiện tại theo trạng thái đơn hàng
const getStepByStatus = (status: string) => {
    switch (status) {
        case 'pending':
            return 2;
        case 'delivered':
            return 4;
        case 'completed':
            return 5;
        default:
            return 1;
    }
};

const ActivityDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const data = await getOrderById(Number(id));
            setOrder(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn hủy đơn hàng này?', [
            { text: 'Không' },
            {
                text: 'Có',
                onPress: async () => {
                    try {
                        const updatedOrder = await cancelOrder(order!.id);
                        setOrder(updatedOrder);
                        Alert.alert('Thành công', 'Đơn hàng đã được hủy.', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    router.replace('/(tabs)'); // Quay về màn hình Home
                                },
                            },
                        ]);
                    } catch (error: any) {
                        Alert.alert('Lỗi', error?.response?.data?.message || 'Hủy đơn thất bại.');
                    }
                },
            },
        ]);
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#10B981" />
            </View>
        );
    }

    if (!order) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-red-500`}>Không tìm thấy đơn hàng.</Text>
            </View>
        );
    }

    const currentStep = getStepByStatus(order.status);

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`bg-green-700 py-5 px-6 flex-row items-center`}>
                <Pressable onPress={() => router.replace('/activity')}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>
                <Text style={tw`text-white text-xl font-semibold text-center flex-1`}>
                    Chi tiết đơn hàng
                </Text>
            </View>

            <View style={tw`px-5 py-6`}>
                {/* Trạng thái chính */}
                <View style={tw`bg-white rounded-2xl p-4 mb-4 shadow border border-gray-100`}>
                    {order.status === 'completed' && (
                        <>
                            <Text style={tw`text-green-700 font-bold text-lg`}>Giao hàng thành công!</Text>
                            <Text style={tw`text-green-700 mt-1`}>
                                Đơn hàng của bạn đã được giao và hoàn tất thành công.
                            </Text>
                        </>
                    )}
                    {order.status === 'delivered' && (
                        <>
                            <Text style={tw`text-yellow-600 font-bold text-lg`}>Đang giao hàng</Text>
                            <Text style={tw`text-yellow-600 mt-1`}>
                                Đơn hàng đang trên đường giao đến bạn.
                            </Text>
                        </>
                    )}
                    {order.status === 'canceled' && (
                        <>
                            <Text style={tw`text-red-600 font-bold text-lg`}>Đơn hàng đã bị hủy</Text>
                            <Text style={tw`text-red-600 mt-1`}>
                                Đơn hàng của bạn đã bị hủy và sẽ không được xử lý nữa.
                            </Text>
                        </>
                    )}
                    {order.status === 'pending' && (
                        <>
                            <Text style={tw`text-gray-700 font-bold text-lg`}>Đang xử lý</Text>
                            <Text style={tw`text-gray-700 mt-1`}>
                                Đơn hàng của bạn đang được xử lý và chuẩn bị.
                            </Text>
                        </>
                    )}
                </View>

                {/* Người nhận */}
                <View style={tw`bg-white rounded-2xl p-4 mb-4 shadow border border-gray-100`}>
                    <Text style={tw`text-green-700 font-bold text-lg`}>
                        Người nhận: {order.user.username}
                    </Text>
                    <Text style={tw`text-green-700 mt-1`}>Số điện thoại: {order.user.phone}</Text>
                    <Text style={tw`text-green-700 mt-1`}>Địa chỉ: {order.delivery_address}</Text>
                    <Text style={tw`text-green-700 mt-2 font-bold text-lg`}>
                        Tổng cộng: {order.total.toLocaleString()} VNĐ
                    </Text>
                </View>

                {/* Các bước trạng thái - chỉ hiển thị nếu không bị hủy */}
                {order.status !== 'canceled' && (
                    <View style={tw`bg-white rounded-2xl p-4 shadow border border-gray-100`}>
                        <Text style={tw`text-green-700 font-bold text-lg mb-3`}>Trạng thái đơn hàng</Text>

                        {orderStatusSteps.map((step, index) => (
                            <View key={index} style={tw`flex-row items-start mb-3`}>
                                <View style={tw`w-4 items-center`}>
                                    <View
                                        style={tw.style(
                                            `w-2 h-2 rounded-full mt-1`,
                                            index < currentStep ? 'bg-green-700' : 'bg-gray-300'
                                        )}
                                    />
                                    {index < orderStatusSteps.length - 1 && (
                                        <View
                                            style={tw.style(
                                                `w-px h-6`,
                                                index < currentStep - 1 ? 'bg-green-700' : 'bg-gray-300'
                                            )}
                                        />
                                    )}
                                </View>
                                <Text
                                    style={tw.style(
                                        `ml-3`,
                                        index < currentStep ? 'text-green-700' : 'text-gray-400'
                                    )}
                                >
                                    {step}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Nút hủy đơn */}
                {order.status === 'pending' && (
                    <Pressable style={tw`mt-4 bg-red-500 rounded-xl py-3`} onPress={handleCancelOrder}>
                        <Text style={tw`text-white text-center font-semibold`}>Hủy đơn hàng</Text>
                    </Pressable>
                )}
            </View>
        </ScrollView>
    );
};

export default ActivityDetailScreen;
