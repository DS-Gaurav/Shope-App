import React from "react";
import { View, Text, Image, StyleSheet,Button,Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Cart() {
  const { id, name, price, image } = useLocalSearchParams();
  const handleBuyNow = () => {
    Alert.alert("Success", "Your purchase has been completed!");
    // Clear cart or navigate to confirmation page

  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All products</Text>

      {id ? (
        <View style={styles.productCard}>
          <Image source={{ uri: image }} style={styles.productImage} />
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>Price: ${price}</Text>
          <View style={styles.footer}>
            <Text style={styles.totalPrice}>Total: ${price}</Text>
            <Button title="Buy Now" onPress={handleBuyNow} color="#007bff" />
          </View>
        </View>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#333",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
