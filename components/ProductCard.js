import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function ProductCard({ item }) {
  if (!item) {
    return <Text>Erro: item não encontrado</Text>;
  }

  const img = require('../assets/cookie-icon.png');

  const addToCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent with the request
        body: JSON.stringify({ productId: item.id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert('Erro ao adicionar ao carrinho');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao adicionar ao carrinho');
    }
  };

  return (
    <Pressable onPress={addToCart}>
      <View style={styles.card}>
        <Image source={img} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.oldPrice}>{item.oldPrice}</Text>
        <Text style={styles.newPrice}>{item.newPrice}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 141,
    height: 152,
    margin: 20,
    marginTop: 50,
  },
  image: {
    width: 50,
    height: 50,
    position: 'absolute',
    marginBottom: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  oldPrice: {
    fontSize: 16,
    color: 'orange',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginBottom: 5,
  },
  newPrice: {
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bold',
  },
});
