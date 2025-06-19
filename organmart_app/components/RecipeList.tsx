import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import tw from 'twrnc';

import { fetchRandomRecipes } from '@/services/recipeService';
import { Recipe } from '@/types';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 12;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;

export default function RecipeList() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const loadRecipes = async () => {
                setLoading(true);
                try {
                    const response = await fetchRandomRecipes();
                    if (isActive) {
                        setRecipes(response.recipes);
                    }
                } catch (error) {
                    console.error('Error fetching random recipes:', error);
                } finally {
                    if (isActive) setLoading(false);
                }
            };

            loadRecipes();

            return () => {
                isActive = false;
            };
        }, [])
    );

    const goToRecipeDetail = (id: number) => {
        router.push({ pathname: '/recipes/[id]', params: { id: String(id) } });
    };

    const renderRecipeItem = ({ item }: { item: Recipe }) => (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => goToRecipeDetail(item.id)}
            style={tw`mr-3`}
        >
            <View
                style={[
                    tw`bg-white rounded-xl p-2.5 border shadow-md border-green-600`,
                    { width: CARD_WIDTH }
                ]}
            >
                <Image
                    source={{ uri: item.image_url }}
                    style={tw`w-full h-20 rounded-md bg-gray-200 mb-2`}
                    resizeMode="cover"
                />
                <Text style={tw`text-sm font-semibold text-green-800 mb-1`} numberOfLines={2}>
                    {item.name}
                </Text>
                <Text style={tw`text-xs text-gray-600`} numberOfLines={2}>
                    {(item.ingredients?.replace(/<[^>]+>/g, '').slice(0, 60) || '') + '...'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={tw`py-5 items-center`}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!recipes.length) {
        return (
            <View style={tw`py-5 items-center`}>
                <Text style={tw`text-gray-500`}>Không có công thức nào được tìm thấy.</Text>
            </View>
        );
    }

    return (
        <View>
            {/* Header */}
            <View style={tw`flex-row justify-between items-center bg-white mb-3`}>
                <Text style={tw`text-lg font-bold text-green-800`}>Công thức nấu ăn</Text>
                <TouchableOpacity onPress={() => router.push('/recipes/recipes')}>
                    <Text style={tw`text-sm text-green-600 font-semibold`}>Xem thêm</Text>
                </TouchableOpacity>
            </View>

            {/* Recipe FlatList */}
            <FlatList
                data={recipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`pl-1 pr-3`}
            />
        </View>
    );
}
