import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OrderItem from './OrderItem';

const OrderDetails = ({ order }) => {
  return (
    <View style={styles.orderDetails}>
      <Text style={styles.orderTitle}>Pedido #{order.id}</Text>
      <Text style={styles.orderDate}>{new Date(order.created_at).toLocaleDateString('pt-BR')}</Text>
      <Text style={styles.orderPrice}>Total: R${order.total_amount.toFixed(2)}</Text>
      <Text style={styles.orderItems}>Método de Entrega: {order.delivery_method}</Text>
      <Text style={styles.orderAddress}>Endereço: {order.address}</Text>
      <Text style={styles.orderItems}>Itens:</Text>
      {order.items.map(item => (
        <OrderItem key={item.cookie_id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 18,
    color: '#888',
  },
  orderPrice: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 18,
    color: '#888',
  },
  orderAddress: {
    fontSize: 18,
    color: '#888',
  },
});

export default OrderDetails;
