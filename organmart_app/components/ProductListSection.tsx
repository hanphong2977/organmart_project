import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    Alert,
    GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

import { fetchProductsByCategory } from '@/services/productService';
import AddToCartModal from '@/components/AddToCartModal';
import { Product } from '@/types';
import { addToCart } from '@/services/addToCartService';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2;

type Props = {
    categoryId: number;
    categoryName: string;
};

export default function ProductListSection({ categoryId, categoryName }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const goToProductDetail = (product: Product) => {
        router.push({
            pathname: '/products/[id]',
            params: { id: String(product.id) },
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchProductsByCategory(categoryId);
                setProducts(data.products.slice(0, 6));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [categoryId]);

    if (loading) {
        return (
            <View style={tw`py-5 items-center`}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!products.length) return null;

    const goToCategoryPage = () => {
        router.push({
            pathname: '/categories/[id]',
            params: { id: String(categoryId), name: categoryName },
        });
    };

    return (
        <View style={tw`my-3`}>
            {/* header */}
            <View style={tw`flex-row justify-between items-center bg-white border-b border-green-300 shadow-sm rounded-t-xl mb-2`}>
                <TouchableOpacity onPress={goToCategoryPage}>
                    <Text style={tw`text-lg font-bold text-green-800`}>{categoryName}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToCategoryPage}>
                    <Text style={tw`text-sm text-green-600 font-medium`}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            {/* product list */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        activeOpacity={0.85}
                        onPress={() => goToProductDetail(product)}
                    >
                        <View
                            style={[
                                tw`bg-white rounded-xl p-2.5 mr-3 border shadow-md border-green-600 relative`,
                                { width: cardWidth - 3 },
                            ]}
                        >
                            <Image
                                source={{ uri: product.image_url }}
                                style={tw`w-full h-[100px] rounded-md bg-white border shadow-md border-white`}
                                resizeMode="contain"
                            />
                            <Text style={tw`mt-2 text-sm font-semibold text-[#333] text-green-800`} numberOfLines={2}>
                                {product.name}
                            </Text>
                            <Text style={tw`mt-1 text-xs font-bold text-[#206F30]`}>
                                {product.price.toLocaleString()} đ
                            </Text>

                            {/* cart icon */}
                            <TouchableOpacity
                                style={tw`absolute bottom-2.5 right-2.5 bg-[#4CAF50] p-1.5 rounded-full z-10`}
                                onPress={(event: GestureResponderEvent) => {
                                    event.stopPropagation(); // ⚠️ ngăn sự kiện lan lên card
                                    handleAddPress(product);
                                }}
                            >
                                <Ionicons name="cart-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <AddToCartModal
                visible={showModal}
                product={selectedProduct}
                onClose={() => setShowModal(false)}
                onConfirm={handleAddToCart}
            />
        </View>
    );
}
