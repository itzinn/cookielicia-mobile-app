import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderItemsSection = ({ cartItems }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pedido</Text>
      {cartItems.map((item) => (
        <Text key={item.id} style={styles.orderItem}>{item.quantity}x {item.title} - {item.newPrice}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#FCB040',
    width: '100%',
    paddingVertical: 5,
  },
  orderItem: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OrderItemsSection;
