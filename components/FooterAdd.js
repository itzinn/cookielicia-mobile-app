import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function FooterComponent() {
  const [count, setCount] = useState(1);
  const pricePerCookie = 10.00;
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.counter}>
        <Pressable onPress={handleDecrement} style={styles.counterButton}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.counterValue}>{count}</Text>
        <Pressable onPress={handleIncrement} style={styles.counterButton}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar R$ {(pricePerCookie * count).toFixed(2)}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FBBF24',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#FBBF24',  
    borderRadius: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',  
    fontFamily: 'Poppins',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

