import React from 'react';
import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Zocial from '@expo/vector-icons/Zocial';

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#206F30',
                tabBarInactiveTintColor: '#707070',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50,
                    marginHorizontal:20,
                    marginBottom: 10,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#FFFFFF',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Trang Chủ",
                    headerShown: false,
                    tabBarIcon: ({ color = "#707070" }) => (
                        <Entypo name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="activity"
                options={{
                    title: "Đơn Hàng",
                    headerShown: false,
                    tabBarIcon: ({ color = "#707070" }) => (
                        <MaterialCommunityIcons name="script-text" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Thư Viện",
                    headerShown: false,
                    tabBarIcon: ({ color = "#707070" }) => (
                        <MaterialIcons name="restaurant-menu" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Giỏ Hàng",
                    headerShown: false,
                    tabBarIcon: ({ color = "#707070" }) => (
                        <Zocial name="cart" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;
