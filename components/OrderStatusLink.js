// OrderStatusLink.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const OrderStatusLink = ({ orderId, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(orderId)}>
      <Text style={styles.buttonText}>Estado do Pedido</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FCB040',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default OrderStatusLink;
