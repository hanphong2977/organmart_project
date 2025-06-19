import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { register } from '@/services/auth';
import { useRouter } from 'expo-router';
import tw from 'twrnc';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async () => {
        if (!username || !password || !phone) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            await register({ username, password, phone });
            router.replace('/(tabs)');
        } catch (err: any) {
            console.log(err.response?.data || err.message);
            Alert.alert('Đăng ký thất bại', 'Vui lòng kiểm tra lại thông tin hoặc thử lại sau.');
        }
    };

    return (
        <View style={tw`flex-1 px-6 justify-center bg-white`}>
            {/* Logo */}
            <View style={tw`items-center mb-3`}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={tw`w-35 h-35 rounded-2xl`}
                    resizeMode="contain"
                />
            </View>

            {/* Title */}
            <Text style={tw`text-3xl font-bold text-green-800 text-center mb-6`}>Đăng ký</Text>

            {/* Username */}
            <TextInput
                placeholder="Tên đăng nhập"
                onChangeText={setUsername}
                style={tw`border border-gray-300 p-3 mb-4 rounded-xl bg-gray-50`}
            />

            {/* Phone */}
            <TextInput
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                onChangeText={setPhone}
                style={tw`border border-gray-300 p-3 mb-4 rounded-xl bg-gray-50`}
            />

            {/* Password */}
            <TextInput
                placeholder="Mật khẩu"
                secureTextEntry
                onChangeText={setPassword}
                style={tw`border border-gray-300 p-3 mb-4 rounded-xl bg-gray-50`}
            />

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegister} style={tw`bg-green-700 py-3 rounded-xl`}>
                <Text style={tw`text-white text-center font-semibold`}>Đăng ký</Text>
            </TouchableOpacity>

            {/* Link to Login */}
            <Text style={tw`text-center mt-4 text-sm`}>
                Đã có tài khoản?{' '}
                <Text
                    style={tw`text-green-700 font-semibold`}
                    onPress={() => router.push('/(auth)/login')}
                >
                    Đăng nhập
                </Text>
            </Text>
        </View>
    );
}
