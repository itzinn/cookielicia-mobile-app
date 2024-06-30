import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function CompleteOrder() {
  const [address, setAddress] = useState('');

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Finalizar</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de entrega</Text>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>Deliver</Text>
          </View>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>Retirada</Text>
          </View>
          <Text style={styles.deliveryFee}>Taxa de entrega - R$ 3,00</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu endereço"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedido</Text>
          <Text style={styles.orderItem}>1x Tradicional Gotas de Chocolate - R$10,00</Text>
          <Text style={styles.orderItem}>1x Vegano - R$8,00</Text>
        </View>

        <Text style={styles.total}>R$ 21,00 / 2 Itens</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>FINALIZAR</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <FooterMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
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
  },
  optionText: {
    fontSize: 19,
    textAlign: 'center',
  },
  deliveryFee: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
  orderItem: {
    fontSize: 18,
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

