import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/Header';
import CookieCard from '../components/CookieCart';

const cookieIcon = require('../assets/cookie-icon.png');
const { width } = Dimensions.get('window');

export default function CartPage() {
  const item1 = {
    image: cookieIcon,
    title: 'Tradicional Gotas de Chocolate',
    description: 'Massa tradicional com deliciosas gotas de chocolate ao leite',
    price: 10.00,
  };

  const item2 = {
    image: cookieIcon,
    title: 'Vegano',
    description: 'Massa vegana com gotas de chocolate belga 70% cacau',
    price: 8.00,
  };

  const subtotal = item1.price + item2.price;
  const deliveryFee = 3.00;
  const serviceFee = 0.00;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Sua Mochila</Text>
        <View style={styles.cookieCardContainer}>
          <CookieCard 
            image={item1.image}
            title={item1.title}
            description={item1.description}
            price={`R$ ${item1.price.toFixed(2)}`} 
          />
        </View>
        <View style={styles.cookieCardContainer}>
          <CookieCard 
            image={item2.image}
            title={item2.title}
            description={item2.description}
            price={`R$ ${item2.price.toFixed(2)}`} 
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar mais Itens</Text>
        </TouchableOpacity>
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
      </ScrollView>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  cookieCardContainer: {
    width: '100%',
    maxWidth: 600,
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  summaryContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 16,
    backgroundColor: '#EDEDE',
    borderRadius: 5,
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#DDD',
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

