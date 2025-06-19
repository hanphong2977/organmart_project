import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { login } from '@/services/auth';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await login(username, password);
            router.replace('/(tabs)');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <View style={tw`flex-1 px-6 justify-center bg-white`}>
            {/* Logo */}
            <View style={tw`items-center mb-3 bg-white`}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={tw`w-35 h-35 rounded-2xl`}
                    resizeMode="contain"
                />
            </View>

            {/* Title */}
            <Text style={tw`text-3xl font-bold text-green-800 text-center mb-6`}>Đăng Nhập</Text>

            {/* Username */}
            <TextInput
                placeholder="Tên đăng nhập"
                onChangeText={setUsername}
                style={tw`border border-gray-300 p-3 mb-4 rounded-xl bg-gray-50`}
            />

            {/* Password */}
            <TextInput
                placeholder="Mật khẩu"
                onChangeText={setPassword}
                secureTextEntry
                style={tw`border border-gray-300 p-3 mb-4 rounded-xl bg-gray-50`}
            />

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} style={tw`bg-green-700 py-3 rounded-xl`}>
                <Text style={tw`text-white text-center font-semibold`}>Đăng Nhập</Text>
            </TouchableOpacity>

            {/* Register link */}
            <Text style={tw`text-center mt-4 text-sm`}>
                Bạn chưa có tài khoản?{' '}
                <Text
                    style={tw`text-green-700 font-semibold`}
                    onPress={() => router.push('/(auth)/register')}
                >
                    Đăng ký
                </Text>
            </Text>
        </View>
    );
}
