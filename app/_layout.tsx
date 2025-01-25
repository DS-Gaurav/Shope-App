import React from 'react';
import { Tabs } from "expo-router"; // expo-router provides a built-in tab navigation system
import { Image } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
        tabBarActiveTintColor: '#007bff', // Active tab color
        headerShown: false, // Hides header for all screens
      }}
    >
      <Tabs.Screen
        name="index" // This should match your "index.jsx" file
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/icons/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart" // This should match your "cart.jsx" file
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/icons/cart.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order" // This should match your "profile.jsx" file
        options={{
          tabBarLabel: 'My Order',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/icons/order.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // This should match your "profile.jsx" file
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/icons/profile.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
