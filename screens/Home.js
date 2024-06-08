import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import ProductCarousel from '../components/ProductCarousel';



export default function Home() {
  return (

    <View style={styles.container}>
        <Header />
          <Text>Ofertas</Text>
          <Text>Ver mais</Text>
          <ProductCarousel />
        <FooterMenu/>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
});
