import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Get query params

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function OrderPage() {
  const { id, name, price, image } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (id && name && price && image) {
      const newItem: CartItem = {
        id: `${id}-${Date.now()}`, // Ensure a unique ID for each duplicate
        name,
        price: parseFloat(price),
        image,
        quantity: 1, // New item starts with quantity 1
      };

      // Always add the new item to the top of the list, even if it already exists
      setCartItems(prevItems => [newItem, ...prevItems]);
    }
  }, [id, name, price, image]); // Dependencies include id, name, price, image

  // Render cart items
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartPrice}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyCartText}>No Orders</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  cartDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  cartName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartPrice: {
    fontSize: 14,
    color: "#6c757d",
  },
  quantityText: {
    fontSize: 14,
    color: "#6c757d",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "#6c757d",
    marginTop: 20,
  },
});
