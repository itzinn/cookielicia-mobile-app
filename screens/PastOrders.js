// PastOrders.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import OrderDetails from '../components/OrderDetails';
import OrderStatusLink from '../components/OrderStatusLink';

export default function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/home', {
          method: 'GET',
          credentials: 'include' // Incluir cookies na requisição
        });

        if (response.ok) {
          setAuthenticated(true); // Atualiza o estado para autenticado se a resposta for OK
        } else {
          window.location.href = '/login'; // Redireciona para o login se não estiver autenticado
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Tratar erro de forma apropriada, se necessário
        window.location.href = '/login'; // Em caso de erro, redireciona para o login
      }
    };

    checkAuthentication();

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-orders', {
          method: 'GET',
          credentials: 'include' // Inclui cookies na requisição
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar pedidos');
        }

        const data = await response.json();
        // Ordenar os pedidos pelo ID em ordem decrescente
        const sortedOrders = data.sort((a, b) => b.id - a.id);
        setOrders(sortedOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderStatusClick = (orderId) => {
    window.location.href = `/orderStatus?orderId=${orderId}`;
  };

  if (loading) {
    return authenticated ? (
      <View style={styles.container}>
        <Header />
        <Text style={styles.loadingText}>Carregando...</Text>
        <FooterMenu />
      </View>
    ) : null;
  }

  if (orders.length === 0) {
    return authenticated ? (
      <View style={styles.container}>
        <Header />
        <Text style={styles.noOrdersText}>Nenhum pedido encontrado.</Text>
        <FooterMenu />
      </View>
    ) : null;
  }

  return authenticated ? (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderContainer}>
            <OrderDetails order={order} />
            <OrderStatusLink orderId={order.id} onPress={handleOrderStatusClick} />
          </View>
        ))}
      </ScrollView>
      <FooterMenu />
    </View>
  ) : null;
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
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    maxWidth: 500,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
