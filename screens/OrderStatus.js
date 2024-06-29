import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function OrderStatus() {
  const { width } = Dimensions.get('window');
  const [deliveryTime, setDeliveryTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const deliveryWindowStart = new Date(now.getTime() + 30 * 60000); // 30 minutes later
    const deliveryWindowEnd = new Date(now.getTime() + 45 * 60000); // 45 minutes later

    const formattedStartTime = formatTime(deliveryWindowStart);
    const formattedEndTime = formatTime(deliveryWindowEnd);

    const deliveryPrediction = `${formattedStartTime} ~ ${formattedEndTime}`;
    setDeliveryTime(deliveryPrediction);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>PEDIDO REALIZADO</Text>

        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Oba!</Text>
          <Text style={styles.messageText}>Seu Cookie quentinho está chegando.</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/cookieMan.jpg')} 
            style={[styles.image, { width: width * 0.3, height: width * 0.2 }]} 
            onError={(error) => console.log('Image load error:', error)} 
          />
        </View>

        <Text style={styles.predictionTitle}>Previsão</Text>
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>{deliveryTime}</Text>
        </View>
      </ScrollView>
      
      <FooterMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  messageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 26,
    textAlign: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    overflow: 'hidden', 
  },
  image: {
    resizeMode: 'contain', 
  },
  predictionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  predictionContainer: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  predictionText: {
    fontSize: 18,
  },
});
