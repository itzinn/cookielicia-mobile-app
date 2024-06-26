import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import { useLocation } from 'react-router-dom';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function OrderStatus() {
  const { width } = Dimensions.get('window');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('orderId');

  //verificacao de login
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/home', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '/login';
      }
    };

    //busca detalhes do pedido
    checkAuthentication();
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/order-details?orderId=${orderId}`, {
          credentials: 'include'
        });
        const data = await response.json();
        setOrderDetails(data);

        //converte horario
        const createdAt = new Date(data.created_at);
        const brtDate = new Date(createdAt.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

        const deliveryWindowStart = new Date(brtDate.getTime() + 30 * 60000);
        const deliveryWindowEnd = new Date(brtDate.getTime() + 45 * 60000);

        const formattedStartTime = formatTime(deliveryWindowStart);
        const formattedEndTime = formatTime(deliveryWindowEnd);

        const deliveryPrediction = `${formattedStartTime} ~ ${formattedEndTime}`;
        setDeliveryTime(deliveryPrediction);
      } catch (error) {
        console.error('Erro ao buscar detalhes do pedido:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  //formata horario
  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (!authenticated || !orderDetails) {
    return <Text>Carregando...</Text>;
  }

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Pedido</Text>
          <Text style={styles.orderDate}>Data do Pedido: {new Date(orderDetails.created_at).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</Text>
          <Text style={styles.orderTime}>Hora do Pedido: {new Date(orderDetails.created_at).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</Text>
          {orderDetails.items.map((item) => (
            <Text key={item.id} style={styles.orderItem}>{item.quantity}x {item.title} - R${item.price}</Text>
          ))}
          <Text style={styles.total}>Total: R$ {orderDetails.total_amount.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <FooterMenu />
    </View>
  );
}


//estilos da pagina
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
  orderDate: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  predictionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  predictionContainer: { alignItems: 'center', marginVertical: 10 },
  predictionText: { fontSize: 18 },
  section: { marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  orderItem: { fontSize: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 }
});
