import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartSummary = ({ subtotal, total }) => {
  const deliveryFee = 3.00;
  const serviceFee = 0.00;

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Resumo do Pedido</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Subtotal</Text>
        <Text style={styles.summaryText}>R$ {subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Taxa de entrega</Text>
        <Text style={styles.summaryText}>R$ {deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>Taxa de Serviço</Text>
        <Text style={styles.summaryText}>R$ {serviceFee.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryTotalText}>Total</Text>
        <Text style={styles.summaryTotalText}>R$ {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 16,
    backgroundColor: '#EDEDE',
    borderRadius: 5,
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 19,
  },
  summaryTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CartSummary;
