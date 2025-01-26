import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type CartItem = {
  id: string;
  name: string;
  price: number; // Changed to number for calculations
  image: string; // Image URL as a string
  quantity: number; // Added quantity field
};

export default function Cart() {
  const router = useRouter();
  const { id, name, price, image } = useLocalSearchParams(); // Get parameters passed from Index
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add the product to the cart when navigated to this page
  useEffect(() => {
    if (id && name && price && image) {
      const newItem: CartItem = { id, name, price: parseFloat(price), image, quantity: 1 };
      setCartItems((prevItems) => {
        // Avoid duplicate items in the cart
        if (prevItems.some((item) => item.id === id)) {
          return prevItems;
        }
        return [...prevItems, newItem];
      });
    }
  }, [id, name, price, image]);

  // Function to remove an item from the cart
  const removeItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Function to update quantity of an item
  const updateQuantity = (itemId: string, increment: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1), // Minimum quantity is 1
            }
          : item
      )
    );
  };

  // Calculate total price of the cart
  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartPrice}>Price: ${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, false)}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, true)}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push("/order")}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: "#e0e0e0",
    padding: 4,
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  removeButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "#6c757d",
    marginTop: 20,
  },
  totalContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginVertical: 8,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
