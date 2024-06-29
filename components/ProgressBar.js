import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProgressBar({ step }) {
  const steps = ['Pedido Efetuado', 'Pedido Pronto', 'Pedido Entregue'];
  const positions = {
    0: '0%',
    1: '40%',
    2: '90%' 
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
        <Image
          source={require('../assets/cookie-icon.png')}
          style={[styles.image, { left: positions[step] }]}
        />
      </View>
      <View style={styles.labelsContainer}>
        {steps.map((label, index) => (
          <Text key={index} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressContainer: {
    width: '90%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    position: 'relative',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: 'linear-gradient(90deg, rgba(255,140,0,1) 0%, rgba(255,69,0,1) 100%)',
    position: 'absolute',
  },
  image: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: -10,
  },
  labelsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: 'orange',
    fontWeight: 'bold',
  },
});
