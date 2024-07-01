import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OrderItem = ({ item }) => {
  return (
    <View style={styles.itemDetails}>
      <Image source={{ uri: './assets/cookie-icon.png' }} style={styles.image} />
      <View style={styles.itemText}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
        <Text style={styles.itemPrice}>Preço: R${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemDetails: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 35,
    marginRight: 20,
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#000',
  },
});

export default OrderItem;
