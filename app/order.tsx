import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Order() {
  return (
    <View style={styles.container}>
      <Text>Order Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
