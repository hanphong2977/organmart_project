import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TextInput,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import { createOrder as createOrderService } from '@/services/orderService';

type OrderItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

const OrderScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const items: OrderItem[] = params.items ? JSON.parse(params.items as string) : [];

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // const shippingFee = 17000;
    const total = subtotal;
    // + shippingFee;

    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [deliveryAddress, setDeliveryAddress] = useState('17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam');
    const [modalVisible, setModalVisible] = useState(false);
    const [tempAddress, setTempAddress] = useState('');

    const paymentMethods = [
        { key: 'COD', label: 'Thanh toán khi nhận hàng' },
        // { key: 'momo', label: 'MoMo' },
        // { key: 'vnpay', label: 'VNPay' },
    ];

    const onCreateOrder = async () => {
        if (!deliveryAddress.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ giao hàng');
            return;
        }
        if (!paymentMethod) {
            Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán');
            return;
        }
        setLoading(true);
        try {
            const orderPayload = {
                items: items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                })),
                payment_method: paymentMethod,
                delivery_address: deliveryAddress,
            };
            const order = await createOrderService(orderPayload);
            Alert.alert('Thành công', 'Đơn hàng đã được tạo!');
            router.replace(`/activity/${order.id}`);
        } catch (error) {
            Alert.alert('Lỗi', (error as Error).message || 'Không thể tạo đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const openAddressModal = () => {
        setTempAddress(deliveryAddress);
        setModalVisible(true);
    };

    const saveAddress = () => {
        setDeliveryAddress(tempAddress.trim());
        setModalVisible(false);
    };

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`bg-green-700 px-4 py-5 flex-row items-center justify-between`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={tw`text-white text-lg font-semibold`}>Xác nhận đơn hàng</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Địa chỉ giao hàng */}
            <View style={tw`m-4 p-4 bg-white rounded-2xl shadow border border-gray-100`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`font-semibold text-green-700`}>Delivery to</Text>
                    <TouchableOpacity onPress={openAddressModal}>
                        <Text style={tw`text-green-600 font-medium`}>
                            {deliveryAddress.trim() ? 'Thay đổi' : 'Thêm mới'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={tw`mt-2 text-gray-600`}>
                    {deliveryAddress.trim() || 'Chưa có địa chỉ'}
                </Text>
            </View>

            {/* Danh sách sản phẩm */}
            <View style={tw`mx-4 mb-4 p-4 bg-white rounded-2xl shadow border border-gray-100`}>
                <Text style={tw`font-semibold text-green-700 mb-2`}>Đơn hàng của bạn</Text>
                {items.map((item, index) => (
                    <View
                        key={index}
                        style={tw`flex-row justify-between items-center py-2 border-b border-green-100`}
                    >
                        <Text style={tw`text-green-900`}>
                            x{item.quantity} {item.name}
                        </Text>
                        <Text style={tw`text-green-900`}>
                            {(item.price * item.quantity).toLocaleString()} VNĐ
                        </Text>
                    </View>
                ))}
            </View>

            {/* Tóm tắt đơn hàng */}
            <View style={tw`mx-4 mb-4 p-4 bg-white rounded-2xl shadow border border-gray-100`}>
                <View style={tw`flex-row justify-between items-center`}>
                    <Text style={tw`text-green-800`}>Tạm tính ({items.length} sản phẩm)</Text>
                    <Text style={tw`text-green-800`}>{subtotal.toLocaleString()} VNĐ</Text>
                </View>
                {/*<View style={tw`flex-row justify-between items-center mt-2`}>*/}
                {/*    <Text style={tw`text-green-800`}>Phí giao hàng</Text>*/}
                {/*    <Text style={tw`text-green-800`}>{shippingFee.toLocaleString()} VNĐ</Text>*/}
                {/*</View>*/}
            </View>

            {/* Phương thức thanh toán */}
            <View style={tw`mx-4 mb-4 p-4 bg-white rounded-2xl shadow border border-gray-100`}>
                <Text style={tw`font-semibold text-green-700 mb-2`}>Phương thức thanh toán</Text>
                {paymentMethods.map(method => (
                    <TouchableOpacity
                        key={method.key}
                        onPress={() => setPaymentMethod(method.key)}
                        style={tw`flex-row items-center mb-3`}
                    >
                        <View
                            style={tw.style(
                                'w-5 h-5 mr-3 rounded-full border-2 border-green-700 justify-center items-center',
                                paymentMethod === method.key && 'bg-green-700'
                            )}
                        >
                            {paymentMethod === method.key && (
                                <View style={tw`w-2.5 h-2.5 bg-white rounded-full`} />
                            )}
                        </View>
                        <Text style={tw`text-green-800`}>{method.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tổng cộng + Nút đặt hàng */}
            <View style={tw`mx-4 mb-8`}>
                <View style={tw`flex-row justify-between items-center mb-4`}>
                    <Text style={tw`text-green-800 text-lg font-medium`}>Total:</Text>
                    <Text style={tw`text-green-800 text-lg font-semibold`}>
                        {total.toLocaleString()} VNĐ
                    </Text>
                </View>
                <TouchableOpacity
                    style={tw`bg-green-700 py-4 rounded-xl items-center`}
                    onPress={onCreateOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={tw`text-white font-semibold text-base`}>Đặt Hàng</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Modal chỉnh sửa địa chỉ */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-black/50`}>
                    <View style={tw`bg-white p-4 rounded-xl w-11/12`}>
                        <Text style={tw`text-lg font-semibold mb-2 text-green-700`}>Địa chỉ giao hàng</Text>
                        <TextInput
                            style={tw`border border-gray-300 rounded px-3 py-2 text-gray-800`}
                            value={tempAddress}
                            onChangeText={setTempAddress}
                            placeholder="Nhập địa chỉ"
                            multiline
                        />
                        <View style={tw`flex-row justify-end mt-4`}>
                            <TouchableOpacity
                                style={tw`mr-4 py-2`}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={tw`text-gray-500`}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={saveAddress}
                                style={tw`bg-green-700 px-4 py-2 rounded`}
                            >
                                <Text style={tw`text-white font-medium`}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default OrderScreen;
