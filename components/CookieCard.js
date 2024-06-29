import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CookieCard({ image, title, description, price }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);


  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.cookieIcon} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>
        <div style={styles.quantityContainer}>
            <button style={styles.quantityButton} onClick={decreaseQuantity}>-</button>
            <span style={styles.quantity}>{quantity}</span>
            <button style={styles.quantityButton} onClick={increaseQuantity}>+</button>
          </div>
      </View>
    </View>
  );
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: '20px',
    padding: '20px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '20px', 
  },
  
  cookieIcon: {
    width: '66px', 
    height: '66px',
    marginRight: '20px',
    flexShrink: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    textAlign: 'center',
  },
  title: {
    margin: '0',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
  },
  description: {
    margin: '5px 0',
    fontSize: '1rem',
    color: '#666',
    fontFamily: 'Poppins, sans-serif',
  },
  price: {
    margin: '10px 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#FFA500',
    fontFamily: 'Poppins, sans-serif',
  },
  quantityContainer: {
    position: 'absolute',
    right: '10px', 
    bottom: '-1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCB040',
    borderRadius: '100%',
    padding: '17px 10px',
    width: '45px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '10px',
  },
  quantityButton: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '0 5px',
  },
  quantity: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
  },
};