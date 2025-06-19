import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import {Ionicons} from "@expo/vector-icons";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; phone: string; email: string ; password: string} | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn đăng xuất?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Đăng xuất',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('user');
                    router.replace('/login');
                },
            },
        ]);
    };

    if (isLoading) {
        return (
            <SafeAreaView style={tw`flex-1 items-center justify-center bg-white`}>
                <Text style={tw`text-gray-500`}>Đang tải thông tin người dùng...</Text>
            </SafeAreaView>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={tw`flex-1 items-center justify-center bg-white`}>
                <Text style={tw`text-gray-500`}>Không tìm thấy thông tin người dùng</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`bg-green-700 py-6 px-4 flex-row items-center`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`mr-4`}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={tw`text-white text-center text-xl font-semibold`}>Thông tin khách hàng</Text>
            </View>

            <ScrollView contentContainerStyle={tw`p-4`}>
                {/* Username */}
                {user.username && (
                    <View style={tw`bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 shadow-sm`}>
                        <Text style={tw`text-green-700 font-semibold`}>Tên đăng nhập</Text>
                        <View style={tw`flex-row justify-between items-center mt-1`}>
                            <Text style={tw`text-green-800 text-base font-medium`}>{user.username}</Text>
                            <Text style={tw`text-green-700`}>Change</Text>
                        </View>
                    </View>
                )}

                {/* Phone */}
                {user.phone && (
                    <View style={tw`bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 shadow-sm`}>
                        <Text style={tw`text-green-700 font-semibold`}>Số điện thoại</Text>
                        <View style={tw`flex-row justify-between items-center mt-1`}>
                            <Text style={tw`text-green-800 text-base font-medium`}>{user.phone}</Text>
                            <Text style={tw`text-green-700`}>Change</Text>
                        </View>
                    </View>
                )}

                {/* Password */}
                {user.password && (
                    <View style={tw`bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 shadow-sm`}>
                        <Text style={tw`text-green-700 font-semibold`}>Mật khẩu</Text>
                        <View style={tw`flex-row justify-between items-center mt-1`}>
                            <Text style={tw`text-green-800 text-base font-medium`}>{user.password}</Text>
                            <Text style={tw`text-green-700`}>Change</Text>
                        </View>
                    </View>
                )}

                {/* Logout */}
                <TouchableOpacity
                    onPress={handleLogout}
                    style={tw`bg-green-700 rounded-xl py-4 mt-6 items-center`}
                >
                    <Text style={tw`text-white text-lg font-semibold`}>Đăng Xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
