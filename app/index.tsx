import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Animated, TextInput,Alert } from "react-native";
import contentfulClient from "../contentfull"; // Ensure correct import
import { useRouter } from "expo-router"; // Import useRouter

type Product = {
  id: string;
  name: string;
  price: string;
  image: { uri: string };
};

// Mock data for products
const carouselItems = [
  "🔥 Huge Discounts on Electronics!",
  "🎉 Buy 1 Get 1 Free on Clothing!",
  "🚚 Free Shipping on Orders Above ₹2,000",
];
const content_types = ['pageLanding', 'pageProduct'];
export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]); // State for dynamic products
  const scrollX = new Animated.Value(0);
  const router = useRouter(); // Initialize router


  // Fetch products from Contentful
  useEffect(() => {
    const fetchProducts = async () => {

      try {
        const response = await contentfulClient.getEntries({ content_type: content_types[1] }); // Ensure 'product' exists

        if (response.items && response.items.length > 0) {
          const fetchedProducts = response.items.map((item: any) => {
            const imageUrl = item.fields.featuredProductImage?.fields?.file?.url || "https://via.placeholder.com/150"; // Adjust based on actual rstructure
            return {
              id: item.sys.id,
              name: item.fields.name,
              price: item.fields.price,
              image: { uri: `https:${imageUrl}` }, // Default empty image if not found
            };
          });
          setProducts(fetchedProducts);
        } else {
          console.warn("No products found.");
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error fetching products from Contentful:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    fetchProducts();
  }, []);

  // Carousel animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: carouselIndex * 300, // Width of each item
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [carouselIndex]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Price ${item.price}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addToCartButton} onPress={() =>
          router.push({
            pathname: "/cart",
            params: {
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image.uri, // Pass image URL as a string
            },
          })
        }>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buynowButton} onPress={() => {
          Alert.alert("Order Confirmation", `${item.name} has been successfully ordered!`);
          router.push({
            pathname: "/order",
            params: {
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image.uri, // Pass image URL as a string
            },
          });
        }}>
          <Text style={styles.buynowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Shope</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false} // Disable manual scrolling
            contentOffset={{ x: carouselIndex * 300, y: 0 }}
          >
            {carouselItems.map((item, index) => (
              <View key={index} style={styles.carouselItem}>
                <Text style={styles.carouselText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          numColumns={1}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 20, // Adding bottom padding to ensure smooth scroll
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 16,
  },
  carouselContainer: {
    height: 200,
    marginBottom: 16,
  },
  carouselItem: {
    width: 500, // Width of each item
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffcccb",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  carouselText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d9534f",
  },
  productList: {
    
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10, // Vertical margin for spacing between rows
    width: "100%", // Take up most of the screen's width
    // Center the card horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8, // Add spacing between the buttons
    flex: 1, // Ensure both buttons take equal width
  },
  addToCartText: {
    color: "#fff",
    textAlign:"center",
    fontSize: 14,
    fontWeight: "bold",
  },
  buynowButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1, // Ensure both buttons take equal width
  },
  buynowText: {
    color: "#fff",
    textAlign:"center",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row", // Align buttons in a row
    justifyContent: "space-between", // Space buttons evenly
    marginTop: 8,
  },
});
