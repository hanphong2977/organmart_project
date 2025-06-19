// app/index.tsx
import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Pressable,
    ScrollView as RNScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

import CategoryList from '@/components/CategoryList';
import ProductListSection from '@/components/ProductListSection';
import RecipeList from '@/components/RecipeList';
import { fetchCategories } from '@/services/categoryService';
import { Category } from '@/types';

type Banner = { image: any };
const { width: screenWidth } = Dimensions.get('window');

const bannersData: Banner[] = [
    { image: require('../../assets/images/banner1.png') },
    { image: require('../../assets/images/banner2.png') },
    { image: require('../../assets/images/banner3.png') },
];

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // Categories
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);

    // Banners auto-scroll
    const [banners] = useState<Banner[]>(bannersData);
    const scrollRef = useRef<RNScrollView | null>(null);
    const currentIndex = useRef(0)
    const bannerInterval = useRef<number | null>(null);

    useEffect(() => {
        // Fetch categories
        (async () => {
            try {
                const cats = await fetchCategories();
                setCategories(cats);
            } catch (e) {
                console.error('Fetch categories error', e);
            } finally {
                setLoadingCats(false);
            }
        })();

        // Banner auto-scroll
        if (banners.length > 1) {
            bannerInterval.current = setInterval(() => {
                currentIndex.current = (currentIndex.current + 1) % banners.length;
                scrollRef.current?.scrollTo({
                    x: currentIndex.current * (screenWidth - 40),
                    animated: true,
                });
            }, 5000) as unknown as number;
        }
        return () => {
            if (bannerInterval.current !== null) {
                clearInterval(bannerInterval.current);
            }
        };
    }, [banners.length]);

    const handleCategoryPress = (cat: Category) => {
        router.push({
            pathname: '/categories/[id]',
            params: { id: String(cat.id), name: cat.name },
        });
    };

    const goToProfile = () => {
        router.push('/(auth)/profile');
    };

    const goToSearch = () => {
        router.push('/Search/search');
    }

    if (loadingCats) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    return (
        <SafeAreaView
            style={[{ flex: 1, paddingTop: insets.top }, tw`bg-white`]}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView
                style={tw`px-5`}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={tw`flex-row justify-between items-center mt-2 mb-4`}>
                    <View>
                        <Text style={tw`text-2xl font-extrabold text-green-800`}>
                            Hôm nay có gì?
                        </Text>
                        <Text style={tw`text-base text-gray-600`}>
                            Khám phá nông sản và công thức mới
                        </Text>
                    </View>
                    <TouchableOpacity onPress={goToProfile}>
                        <Ionicons
                            name="person-circle-outline"
                            size={40}
                            color="#2E7D32"
                        />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <Pressable onPress={goToSearch}>
                    <View style={tw`flex-row items-center border border-green-700 rounded-full px-4 py-1 mb-4`}>
                        <Ionicons name="search" size={20} color="#2E7D32" />
                        <Text style={tw`ml-2 text-sm text-gray-700 text-gray-500 py-2`}>
                            Tìm kiếm
                        </Text>
                    </View>
                </Pressable>

                {/* Banners */}
                <View style={tw`mb-4`}>
                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                    >
                        {banners.map((b, i) => (
                            <View
                                key={i}
                                style={{
                                    width: screenWidth - 40,
                                    marginRight: 10,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    source={b.image}
                                    style={{ width: screenWidth - 40, height: 180 }}
                                    resizeMode="cover"
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Category List */}
                <CategoryList onCategoryPress={handleCategoryPress} />

                {/* Product Sections */}
                {categories.map((cat) => (
                    <ProductListSection
                        key={cat.id}
                        categoryId={cat.id}
                        categoryName={cat.name}
                    />
                ))}

                {/* Recipes */}
                <RecipeList />

                <View style={tw`h-20`} />
            </ScrollView>
        </SafeAreaView>
    );
}
