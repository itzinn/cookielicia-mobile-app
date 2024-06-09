import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import CookieCard from '../components/CookieCart';

export default function CartPage() {
  const item = {
    image: '../assets/cookie-icon.png',
    title: 'Tradicional Gotas de Chocolate',
    description: 'Massa tradicional com deliciosas gotas de chocolate ao leite',
    price: 'R$ 10,00'
  };

  const Item2 = {
    image: '../assets/cookie-icon.png',
    title: 'Vegano',
    description: 'Massa vegana com gotas de chocolate belga 70% cacau',
    price: 'R$ 12,00'
  };

  return (
    <View>
      <Header />
     <CookieCard 
     image={item.image}
     title={item.title}
     description={item.description}
     price={item.price} />

    <CookieCard 
     image={Item2.image}
     title={Item2.title}
     description={Item2.description}
     price={Item2.price} />

    </View>
  );
}
