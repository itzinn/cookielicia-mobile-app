import React from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';

const DeliveryMethodSection = ({ deliveryMethod, setDeliveryMethod }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Método de entrega</Text>
      <View style={styles.optionContainer}>
        <CheckBox
          value={deliveryMethod === 'Delivery'}
          onValueChange={() => setDeliveryMethod('Delivery')}
        />
        <Text style={styles.optionText}>Delivery</Text>
      </View>
      <View style={styles.optionContainer}>
        <CheckBox
          value={deliveryMethod === 'Retirada'}
          onValueChange={() => setDeliveryMethod('Retirada')}
        />
        <Text style={styles.optionText}>Retirada</Text>
      </View>
      {deliveryMethod === 'Delivery' && (
        <Text style={styles.deliveryFee}>Taxa de entrega - R$ 3,00</Text>
      )}
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
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 19,
    marginLeft: 10,
  },
  deliveryFee: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default DeliveryMethodSection;
