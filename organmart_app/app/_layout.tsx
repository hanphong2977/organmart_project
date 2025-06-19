import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                // Điều hướng sau 1 tick (tránh lỗi navigate quá sớm)
                setTimeout(() => {
                    router.replace('/(auth)/login');
                }, 0);
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="products/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="activity/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="categories/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="recipes/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="recipes/recipes" options={{ headerShown: false }} />
                <Stack.Screen name="Order/OrderConfirmScreen" options={{ headerShown: false }} />
                <Stack.Screen name="Search/search" options={{ headerShown: false }} />
            </Stack>

            {loading && (
                <View className="absolute inset-0 items-center justify-center bg-white">
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
        </>
    );
}
