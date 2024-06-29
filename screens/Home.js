import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Link, Pressable } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import ProductCarousel from '../components/ProductCarousel';


export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Ofertas</Text>
        <Pressable>
          <Text style={styles.headerLink}>Ver mais</Text>
        </Pressable>
      </View>
      <ProductCarousel />

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cookies</Text>
        <Pressable>
          <Text style={styles.headerLink}>Ver mais</Text>
        </Pressable>
      </View>

      <ProductCarousel />

      <FooterMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  headerLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
  },
});
