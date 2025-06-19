import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import tw from 'twrnc';
import { fetchLibraryItems, removeLibraryItem } from '@/services/libraryService';
import { LibraryItem } from '@/types';
import { Ionicons } from '@expo/vector-icons'; // ✅ icon từ expo

export default function Library() {
    const router = useRouter();
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadLibrary = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchLibraryItems();
            setItems(data);
        } catch (err) {
            console.error('Fetch library items error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadLibrary();
        }, [loadLibrary])
    );

    const handleRemove = async (itemId: number) => {
        try {
            await removeLibraryItem(itemId);
            setItems((prev) => prev.filter(item => item.id !== itemId));
        } catch (err) {
            console.error('Failed to remove from library:', err);
        }
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center bg-white`}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            {/* Header */}
            <View style={tw`bg-green-700 py-5 px-6`}>
                <Text style={tw`text-white text-xl font-semibold text-center`}>Thư Viện</Text>
            </View>

            <View style={tw`px-6 py-6`}>
                <Text style={tw`text-green-700 text-2xl font-bold mb-4`}>Công thức nấu ăn bạn đã lưu</Text>

                {items.length === 0 ? (
                    <Text style={tw`text-gray-500 text-center mt-8`}>
                        Bạn chưa lưu bất kỳ công thức nấu ăn nào.
                    </Text>
                ) : (
                    items.map((item) => (
                        <View
                            key={item.id}
                            style={tw`relative bg-white p-4 mb-6 rounded-2xl shadow border border-gray-100 flex-row`}
                        >
                            {/* Heart icon */}
                            <TouchableOpacity
                                style={tw`absolute top-2 right-2 z-10`}
                                onPress={() => handleRemove(item.id)}
                            >
                                <Ionicons name="heart" size={24} color="red" />
                            </TouchableOpacity>

                            {/* Left: info */}
                            <Pressable
                                onPress={() =>
                                    router.push({ pathname: '/recipes/[id]', params: { id: String(item.recipe_id) } })
                                }
                                style={tw`flex-1 pr-4`}
                            >
                                <Text style={tw`text-green-700 text-lg font-semibold`}>
                                    {item.recipe.name}
                                </Text>
                                <Text style={tw`text-gray-600 text-sm mt-2`} numberOfLines={2}>
                                    {item.recipe.instructions.replace(/<[^>]+>/g, '').slice(0, 150) + '...'}
                                </Text>
                            </Pressable>

                            {/* Right: image */}
                            <View style={tw`items-center`}>
                                <Image
                                    source={{ uri: item.recipe.image_url }}
                                    style={tw`w-28 h-28 rounded-xl bg-gray-200`}
                                    resizeMode="cover"
                                />
                            </View>
                        </View>
                    ))
                )}
            </View>

            <View style={tw`h-14`} />
        </ScrollView>
    );
}
