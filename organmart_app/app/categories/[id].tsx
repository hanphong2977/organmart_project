import React, { useEffect, useState } from 'react';
import {
    View, Text, Image,
    TouchableOpacity, Dimensions, ActivityIndicator, FlatList, Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

import { fetchProductsByCategory } from '@/services/productService';
import { Product } from '@/types';
import AddToCartModal from '@/components/AddToCartModal';
import {addToCart} from "@/services/addToCartService";

const screenWidth = Dimensions.get('window').width;
const ITEM_MARGIN = 12;
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * 3) / 2;

const PAGE_SIZE = 6;

export default function CategoryProductsScreen() {
    const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const loadProducts = async (targetPage = 1) => {
        if (!id) return;
        setLoading(true);
        try {
            const { products, total } = await fetchProductsByCategory(Number(id), targetPage);
            setProducts(products);
            setTotal(total);
            setPage(targetPage);
        } catch (error) {
            console.error('Lỗi tải sản phẩm:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setProducts([]);
        setPage(1);
        setTotal(0);
        loadProducts(1);
    }, [id]);

    const handleAddPress = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleAddToCart = async ({
                                       productId,
                                       quantity,
                                   }: {
        productId: number;
        quantity: number;
    }) => {
        try {
            await addToCart({ productId, quantity });
            Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (error) {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng.');
        }
    };


    const goToPage = (target: number) => {
        if (target >= 1 && target <= totalPages && target !== page) {
            loadProducts(target);
        }
    };

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            onPress={() => router.push(`/products/${item.id}`)}
            activeOpacity={0.9}
            style={[
                tw`bg-white rounded-xl p-2.5 mb-4 border shadow-md border-green-600`,
                { width: ITEM_WIDTH, marginRight: ITEM_MARGIN / 2 }
            ]}
        >
            <Image
                source={{ uri: item.image_url }}
                style={[
                    tw`rounded-md border shadow-md border-white bg-white`,
                    { width: '100%', height: ITEM_WIDTH * 0.75 }
                ]}
                resizeMode="contain"
            />
            <Text style={tw`mt-2 text-sm font-semibold text-green-800`} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={tw`mt-1 text-xs font-bold text-[#206F30]`}>
                {item.price.toLocaleString()} đ
            </Text>
            <TouchableOpacity
                style={tw`absolute bottom-2.5 right-2.5 bg-[#4CAF50] p-1.5 rounded-full`}
                onPress={() => handleAddPress(item)}
            >
                <Ionicons name="cart-outline" size={20} color="#fff" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row items-center px-5 py-4 bg-green-600`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={tw`text-xl font-bold text-white`}>
                    {name || 'Sản phẩm'}
                </Text>
            </View>

            {/* Danh sách sản phẩm */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: ITEM_MARGIN }}
                contentContainerStyle={tw`pt-4 pb-2`}
                ListFooterComponent={loading ? (
                    <View style={tw`w-full items-center py-4`}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                    </View>
                ) : null}
            />

            {/* Phân trang */}
            {!loading && totalPages > 1 && (
                <View style={tw`flex-row justify-center items-center py-4 border-t border-gray-200 bg-white`}>
                    <TouchableOpacity onPress={() => goToPage(1)} disabled={page === 1} style={tw`mx-2`}>
                        <Ionicons name="play-skip-back" size={24} color={page === 1 ? '#ccc' : '#15803d'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToPage(page - 1)} disabled={page === 1} style={tw`mx-2`}>
                        <Ionicons name="chevron-back" size={24} color={page === 1 ? '#ccc' : '#15803d'} />
                    </TouchableOpacity>
                    <Text style={tw`text-sm text-gray-700 mx-2`}>
                        Trang {page} / {totalPages}
                    </Text>
                    <TouchableOpacity onPress={() => goToPage(page + 1)} disabled={page === totalPages} style={tw`mx-2`}>
                        <Ionicons name="chevron-forward" size={24} color={page === totalPages ? '#ccc' : '#15803d'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToPage(totalPages)} disabled={page === totalPages} style={tw`mx-2`}>
                        <Ionicons name="play-skip-forward" size={24} color={page === totalPages ? '#ccc' : '#15803d'} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal thêm vào giỏ */}
            <AddToCartModal
                visible={showModal}
                product={selectedProduct}
                onClose={() => setShowModal(false)}
                onConfirm={handleAddToCart}
            />
        </View>
    );
}
