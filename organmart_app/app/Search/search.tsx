import { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { searchKeyword } from '@/services/searchService';

type SearchItem = {
    id: number;
    name: string;
    type: 'product' | 'recipe';
};

export default function SearchPage() {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState<SearchItem[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (keyword.trim() === '') {
            setData([]);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const { products, recipes } = await searchKeyword(keyword);
                const searchItems: SearchItem[] = [
                    ...products.map((p) => ({
                        id: p.id,
                        name: p.name,
                        type: 'product' as const,
                    })),
                    ...recipes.map((r) => ({
                        id: r.id,
                        name: r.name,
                        type: 'recipe' as const,
                    })),
                ];
                setData(searchItems);
            } catch (error) {
                console.error('Lỗi khi tìm kiếm:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [keyword]);

    const handlePressItem = (item: SearchItem) => {
        if (item.type === 'product') {
            router.push({
                pathname: '/products/[id]',
                params: { id: item.id },
            });
        } else if (item.type === 'recipe') {
            router.push({
                pathname: '/recipes/[id]',
                params: { id: item.id },
            });
        }
    };

    return (
        <View style={tw`flex-1 bg-white p-4`}>
            {/* Thanh tìm kiếm */}
            <View style={tw`flex-row items-center border border-green-700 rounded-full px-4 py-2 mb-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2E7D32" />
                </TouchableOpacity>
                <TextInput
                    placeholder="Nhập từ khóa tìm kiếm"
                    placeholderTextColor="#4B5563"
                    style={tw`flex-1 text-sm text-gray-700 ml-2`}
                    value={keyword}
                    onChangeText={setKeyword}
                    autoFocus
                />
            </View>

            {/* Loading indicator */}
            {loading && (
                <View style={tw`mt-4`}>
                    <ActivityIndicator size="small" color="#2E7D32" />
                </View>
            )}

            {/* Kết quả tìm kiếm */}
            {!loading && keyword.trim() !== '' && (
                data.length > 0 ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => `${item.type}-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={tw`p-3 border-b border-gray-200`}
                                onPress={() => handlePressItem(item)}
                            >
                                <Text style={tw`text-base text-gray-800`}>
                                    {item.name} {item.type === 'recipe' ? '(Công thức)' : ''}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text style={tw`text-center text-gray-500 mt-10`}>
                        Không tìm thấy kết quả nào
                    </Text>
                )
            )}
        </View>
    );
}
