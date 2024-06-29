import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CookieCard({ image, title, description, price }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cookieIcon} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cookieIcon: {
    width: 66,
    height: 66,
    marginRight: 20,
    flexShrink: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
  },
  description: {
    margin: 5,
    fontSize: '1rem',
    color: '#666',
    fontFamily: 'Poppins, sans-serif',
  },
  price: {
    margin: 10,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#FFA500',
    fontFamily: 'Poppins, sans-serif',
  },
});
