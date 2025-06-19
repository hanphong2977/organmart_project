import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, TouchableOpacity,
    ActivityIndicator, FlatList, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import tw from 'twrnc';

import { fetchRecipes } from '@/services/recipeService';
import { Recipe } from '@/types';

const screenWidth = Dimensions.get('window').width;

export default function AllRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(total / 6);

    const loadRecipes = async (targetPage = 1) => {
        setLoading(true);
        try {
            const { recipes, total } = await fetchRecipes(targetPage);
            setRecipes(recipes);
            setTotal(total);
            setPage(targetPage);
        } catch (err) {
            console.error('Fetch recipes error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRecipes(1);
    }, []);

    const goToRecipeDetail = (id: number) => {
        router.push(`/recipes/${id}`);
    };

    const goToPage = (target: number) => {
        if (target >= 1 && target <= totalPages && target !== page) {
            loadRecipes(target);
        }
    };

    const RecipeItem = ({ item }: { item: Recipe }) => {
        const plainIngredients = item.ingredients
            .replace(/<ul>/gi, '')
            .replace(/<\/ul>/gi, '')
            .replace(/<li>/gi, '• ')
            .replace(/<\/li>/gi, '\n')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/?p>/gi, '\n')
            .replace(/&nbsp;/gi, ' ')
            .replace(/<[^>]+>/g, '')
            .replace(/\n{2,}/g, '\n')
            .replace(/[ \t]{2,}/g, ' ')
            .trim();

        return (
            <TouchableOpacity
                style={tw`border border-green-600 p-4 rounded-xl bg-white mb-4 flex-row items-center`}
                onPress={() => goToRecipeDetail(item.id)}
            >
                <Image
                    source={{ uri: item.image_url }}
                    style={tw`w-20 h-20 rounded-md bg-gray-200 mr-4`}
                    resizeMode="cover"
                />
                <View style={tw`flex-1`}>
                    <Text style={tw`text-base font-semibold text-green-800 mb-1`} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text
                        style={tw`text-xs text-gray-700`}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {plainIngredients}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`flex-row items-center px-5 py-4 bg-green-600`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`mr-3`}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={tw`text-xl font-bold text-white`}>
                    Tất cả công thức
                </Text>
            </View>

            {/* Danh sách công thức */}
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={RecipeItem}
                contentContainerStyle={tw`pt-4 pb-2 px-5`} // Thêm padding cho danh sách
                ListEmptyComponent={!loading ? (
                    <View style={tw`w-full items-center py-10`}>
                        <Text style={tw`text-gray-500`}>Không có công thức nào để hiển thị</Text>
                    </View>
                ) : null}
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
        </View>
    );
}
