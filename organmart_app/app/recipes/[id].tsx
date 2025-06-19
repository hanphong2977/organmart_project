// app/recipes/[id].tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import RenderHTML from 'react-native-render-html';
import { fetchRecipeById } from '@/services/recipeService';
import { fetchLibraryItems, addLibraryItem, removeLibraryItem } from '@/services/libraryService';
import { Recipe, LibraryItem } from '@/types';
import { LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Bỏ qua warning “Support for defaultProps…” từ react-native-render-html
LogBox.ignoreLogs([
    'Support for defaultProps will be removed from function components'
]);

const { width: screenWidth } = Dimensions.get('window');

export default function RecipeDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const recipeId = Number(id);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    // trạng thái heart
    const [inLibrary, setInLibrary] = useState(false);
    const [libraryItemId, setLibraryItemId] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            if (!id) return;
            try {
                // load recipe detail
                const data = await fetchRecipeById(recipeId);
                setRecipe(data);

                // load thư viện của user (giả sử user đã login và ta lấy tất cả library)
                const items = await fetchLibraryItems();
                const existing = items.find((it) => it.recipe_id === recipeId);
                if (existing) {
                    setInLibrary(true);
                    setLibraryItemId(existing.id);
                }
            } catch (err) {
                console.error('Fetch recipe detail error:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, recipeId]);

    const toggleLibrary = async () => {
        if (!recipe) return;
        try {
            if (inLibrary) {
                await removeLibraryItem(recipeId);
                setInLibrary(false);
            } else {
                const newItem = await addLibraryItem(recipeId);
                setInLibrary(true);
                setLibraryItemId(newItem.id);
            }
        } catch (err: any) {
            console.error('Library toggle error details:', err.response?.data || err.message);
        }
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <Text style={tw`text-gray-500`}>Không tìm thấy công thức</Text>
            </View>
        );
    }

    const tagsStyles = {
        p:      { marginBottom: 12, color: '#374151', fontSize: 16, lineHeight: 24 },
        strong: { fontWeight: '700', color: '#111827' as any },
        ul:     { marginBottom: 12, paddingLeft: 16 },
        li:     { marginBottom: 4, color: '#374151', fontSize: 16 },
    };

    return (
        <ScrollView style={tw`bg-white`}>
            <View>
                <Image
                    source={{ uri: recipe.image_url }}
                    style={{ width: screenWidth, height: screenWidth * 0.6 }}
                    resizeMode="cover"
                />
                {/* Back button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={tw`absolute top-4 left-4 p-2 bg-white/80 rounded-full shadow-md`}
                >
                    <Ionicons name="arrow-back" size={22} color="#206F30" />
                </TouchableOpacity>
                {/* Heart button */}
                <TouchableOpacity
                    onPress={toggleLibrary}
                    style={tw`absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md`}
                >
                    <Ionicons
                        name={inLibrary ? 'heart' : 'heart-outline'}
                        size={24}
                        color={inLibrary ? '#e0245e' : '#374151'}
                    />
                </TouchableOpacity>
            </View>

            <View style={tw`p-4`}>
                <Text style={tw`text-2xl font-bold text-green-800 mb-4`}>
                    {recipe.name}
                </Text>

                <Text style={tw`text-xl font-semibold text-gray-800 mb-2`}>
                    Nguyên liệu
                </Text>
                <RenderHTML
                    contentWidth={screenWidth - 32}
                    source={{ html: recipe.ingredients }}
                    tagsStyles={tagsStyles}
                />

                <Text style={tw`text-xl font-semibold text-gray-800 mt-4 mb-2`}>
                    Hướng dẫn
                </Text>
                <RenderHTML
                    contentWidth={screenWidth - 32}
                    source={{ html: recipe.instructions }}
                    tagsStyles={tagsStyles}
                />
            </View>
        </ScrollView>
    );
}
