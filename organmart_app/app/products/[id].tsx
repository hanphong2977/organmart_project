import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    SafeAreaView, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

import { fetchProductById } from '@/services/productService';
import { Product } from '@/types';
import { getCart, addToCart } from '@/services/addToCartService'; // Thêm hàm getCart và addToCart từ dịch vụ giỏ hàng

const { width: screenWidth } = Dimensions.get('window');

export default function ProductDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState<any[]>([]); // Lưu trữ thông tin giỏ hàng

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const data = await fetchProductById(Number(id)); // Xác nhận lại kiểu đối số
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    // Lấy thông tin giỏ hàng khi tải trang
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart(); // Lấy giỏ hàng
                setCartItems(response.data || []);
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handleAddToCart = async () => {
        if (product) {
            try {
                await addToCart({ productId: product.id, quantity });
                const updatedCart = await getCart();
                setCartItems(updatedCart.data);
                Alert.alert('Thành công', 'Đã thêm vào giỏ hàng!');
            } catch (error) {
                console.error('Failed to add product to cart:', error);
                Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng.');
            }
        }
    };

    const handleBuyNow = () => {
        if (product) {
            const orderItem = [{
                id: product.id,
                name: product.name,
                price: product.price.valueOf(),
                quantity: quantity,
            }];

            router.push({
                pathname: '/Order/OrderConfirmScreen',
                params: {
                    items: JSON.stringify(orderItem),
                },
            });
        }
    };

    // Tìm số lượng sản phẩm hiện tại trong giỏ hàng
    const cartQuantity = cartItems.length;

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#206F30" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <Text style={tw`text-gray-500`}>Không tìm thấy sản phẩm</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            {/* Carousel + Back Button */}
            <View style={tw`relative shadow-md border border-white bg-white`}>
                <Image
                    source={{ uri: product.image_url }}
                    style={{ width: screenWidth, height: 250 }}
                    resizeMode="contain"
                />
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={tw`absolute top-4 left-4 bg-white p-2 rounded-full shadow`}
                >
                    <Ionicons name="arrow-back" size={24} color="#206F30" />
                </TouchableOpacity>
            </View>

            <ScrollView style={tw`flex-1`}>
                <View style={tw`px-4 mt-4`}>
                    {/* Title, Price, Rating */}
                    <View style={tw`mb-4 pb-4 border-b border-gray-200`}>
                        <Text style={tw`text-xl font-bold text-green-800`} numberOfLines={2}>
                            {product.name}
                        </Text>
                        <Text style={tw`text-lg text-green-700 mt-1`}>
                            {product.price.toLocaleString()} đ
                        </Text>
                        <View style={tw`flex-row items-center mt-2`}>
                            {[0, 1, 2, 3, 4].map(i => (
                                <Ionicons
                                    key={i}
                                    name={i < 4 ? 'star' : 'star-outline'}
                                    size={16}
                                    color="#FACC15"
                                    style={tw`mr-1`}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Quantity Selector */}
                    <View style={tw`flex-row items-center justify-between mb-6`}>
                        <Text style={tw`text-base font-semibold text-green-800`}>Số lượng</Text>
                        <View style={tw`flex-row items-center bg-green-700 rounded-full px-4 py-2`}>
                            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
                                <Text style={tw`text-white text-xl`}>–</Text>
                            </TouchableOpacity>
                            <Text style={tw`text-white mx-4 text-base`}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
                                <Text style={tw`text-white text-xl`}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={tw`mb-12`}>
                        <Text style={tw`text-base font-semibold text-green-800 mb-2`}>Mô tả sản phẩm</Text>
                        <Text style={tw`text-base text-gray-700 leading-relaxed`}>
                            {product.description}
                        </Text>
                    </View>

                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={tw`flex-row p-4 border-t border-gray-200 bg-white`}>
                <TouchableOpacity
                    onPress={handleAddToCart}
                    style={tw`bg-green-700 p-4 rounded-xl mr-4 flex-row items-center`}
                >
                    <Ionicons name="basket" size={25} color="#fff" />
                    <Text style={tw`text-white ml-2`}>{cartQuantity}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleBuyNow}
                    style={tw`flex-1 bg-green-700 p-4 rounded-xl items-center justify-center`}
                >
                    <Text style={tw`text-white font-semibold text-lg`}>Mua Ngay</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
