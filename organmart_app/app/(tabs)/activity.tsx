import { View, Text, ScrollView, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { getOrders } from '@/services/orderService';
import { Order } from '@/types/index';
import { Ionicons } from '@expo/vector-icons';

const Activity = () => {
    const router = useRouter();
    const [activities, setActivities] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async (pageNumber = 1) => {
        if (loading) return; // tránh gọi nhiều lần cùng lúc
        setLoading(true);
        try {
            const { orders, pagination } = await getOrders(pageNumber);
            setActivities(orders); // thay vì append vì phân trang nút bấm tải lại trang
            setPage(pagination.current_page);
            setLastPage(pagination.last_page);
        } catch (error) {
            console.error('Không thể lấy danh sách đơn hàng:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    const goToPage = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > lastPage || loading) return;
        fetchData(pageNumber);
    };

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <View style={tw`bg-green-700 py-5 px-6`}>
                <Text style={tw`text-white text-center text-xl font-semibold`}>
                    Đơn hàng
                </Text>
            </View>

            <View style={tw`px-5 mt-6`}>
                <Text style={tw`text-xl font-bold text-green-700 mb-4`}>
                    Hoạt động gần đây
                </Text>

                {activities.map((order) => (
                    <View
                        key={order.id}
                        style={tw`bg-white rounded-2xl shadow p-5 mb-4 border border-gray-100`}
                    >
                        <View style={tw`flex-row justify-between items-center mb-2`}>
                            <Text style={tw`text-green-700 font-bold text-lg`}>
                                {order.created}
                            </Text>
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: '/activity/[id]',
                                        params: { id: order.id.toString() },
                                    })
                                }
                            >
                                <Text style={tw`text-green-700 font-semibold`}>
                                    Xem chi tiết
                                </Text>
                            </Pressable>
                        </View>

                        <View style={tw`mb-2`}>
                            {order.orderItems.map((item, i) => (
                                <Text key={i} style={tw`text-green-700 mb-1`}>
                                    ↙ ×{item.quantity} {item.product.name}
                                </Text>
                            ))}
                        </View>

                        <View style={tw`flex-row justify-between mt-2`}>
                            <Text style={tw`text-green-700 font-bold text-lg`}>Tổng</Text>
                            <Text style={tw`text-green-700 font-bold text-lg`}>
                                {order.total.toLocaleString()} VNĐ
                            </Text>
                        </View>

                        <View style={tw`mt-1`}>
                            {order.status === 'pending' && (
                                <Text style={tw`italic`}>
                                    <Text style={tw`text-green-700`}>Trạng thái: </Text>
                                    <Text style={tw`text-yellow-500`}>Đang chờ xử lý</Text>
                                </Text>
                            )}
                            {order.status === 'delivered' && (
                                <Text style={tw`italic`}>
                                    <Text style={tw`text-green-700`}>Trạng thái: </Text>
                                    <Text style={tw`text-blue-500`}>Đang giao hàng</Text>
                                </Text>
                            )}
                            {order.status === 'completed' && (
                                <Text style={tw`italic`}>
                                    <Text style={tw`text-green-700`}>Trạng thái: </Text>
                                    <Text style={tw`text-green-600`}>Đã giao hàng thành công</Text>
                                </Text>
                            )}
                            {order.status === 'canceled' && (
                                <Text style={tw`italic`}>
                                    <Text style={tw`text-green-700`}>Trạng thái: </Text>
                                    <Text style={tw`text-red-500`}>Đã hủy đơn hàng</Text>
                                </Text>
                            )}
                        </View>
                    </View>
                ))}

                {loading && <ActivityIndicator size="large" color="#22c55e" style={tw`my-4`} />}

                {/* Phân trang */}
                {!loading && lastPage > 1 && (
                    <View style={tw`flex-row justify-center items-center py-4 border-t border-gray-200 bg-white`}>
                        <TouchableOpacity onPress={() => goToPage(1)} disabled={page === 1} style={tw`mx-2`}>
                            <Ionicons name="play-skip-back" size={24} color={page === 1 ? '#ccc' : '#15803d'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goToPage(page - 1)} disabled={page === 1} style={tw`mx-2`}>
                            <Ionicons name="chevron-back" size={24} color={page === 1 ? '#ccc' : '#15803d'} />
                        </TouchableOpacity>
                        <Text style={tw`text-sm text-gray-700 mx-2`}>
                            Trang {page} / {lastPage}
                        </Text>
                        <TouchableOpacity onPress={() => goToPage(page + 1)} disabled={page === lastPage} style={tw`mx-2`}>
                            <Ionicons name="chevron-forward" size={24} color={page === lastPage ? '#ccc' : '#15803d'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goToPage(lastPage)} disabled={page === lastPage} style={tw`mx-2`}>
                            <Ionicons name="play-skip-forward" size={24} color={page === lastPage ? '#ccc' : '#15803d'} />
                        </TouchableOpacity>
                    </View>
                )}

            </View>

            <View style={tw`h-14`} />
        </ScrollView>
    );
};

export default Activity;
