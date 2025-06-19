import React, { useEffect, useState } from 'react';
import {
    View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity
} from 'react-native';
import tw from 'twrnc';
import { fetchCategories } from '@/services/categoryService';
import { Category } from '@/types';

type Props = {
    onCategoryPress?: (cat: Category) => void;
};

export default function CategoryList({ onCategoryPress }: Props) {
    const [state, setState] = useState<{ categories: Category[]; loading: boolean; error?: string }>({
        categories: [], loading: true,
    });

    useEffect(() => {
        (async () => {
            try {
                const cats = await fetchCategories();
                setState({ categories: cats, loading: false });
            } catch (err) {
                console.error(err);
                setState(prev => ({ ...prev, loading: false, error: 'Không thể tải danh mục' }));
            }
        })();
    }, []);

    if (state.loading) {
        return (
            <View style={tw`py-4`}>
                <ActivityIndicator size="large" color="#3b82f6" />
            </View>
        );
    }
    if (state.error) {
        return (
            <View style={tw`p-4 items-center`}>
                <Text style={tw`text-red-600`}>{state.error}</Text>
            </View>
        );
    }
    if (!state.categories.length) {
        return (
            <View style={tw`p-4 items-center`}>
                <Text style={tw`text-gray-500`}>Không có danh mục nào</Text>
            </View>
        );
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw``}>
            {state.categories.map(cat => (
                <TouchableOpacity
                    key={cat.id}
                    onPress={() => onCategoryPress?.(cat)}
                    style={tw`items-center w-20`}
                >
                    <View style={tw`bg-white p-1.5 rounded-full border shadow-md border-green-600`}>
                        <Image
                            source={{ uri: cat.image_url }}
                            style={tw`w-12 h-12 rounded-[15px] bg-white`}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={tw`mt-1.5 text-xs font-semibold text-gray-800 text-center`} numberOfLines={2}>
                        {cat.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
