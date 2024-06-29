import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import CookieCard from '../components/CookieCart';

const cookieIcon = require('../assets/cookie-icon.png');

export default function CartPage() {
  const item1 = {
    image: cookieIcon,
    title: 'Tradicional Gotas de Chocolate',
    description: 'Massa tradicional com deliciosas gotas de chocolate ao leite',
    price: 'R$ 10,00'
  };

  const item2 = {
    image: cookieIcon,
    title: 'Vegano',
    description: 'Massa vegana com gotas de chocolate belga 70% cacau',
    price: 'R$ 12,00'
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CookieCard 
          image={item1.image}
          title={item1.title}
          description={item1.description}
          price={item1.price} 
        />
        <CookieCard 
          image={item2.image}
          title={item2.title}
          description={item2.description}
          price={item2.price} 
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  scrollView: {
    padding: 16,
    alignItems: 'center',
  }
});
