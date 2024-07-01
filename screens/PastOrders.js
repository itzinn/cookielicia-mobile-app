import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function PastOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        setOrders(data);
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
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.loadingText}>Carregando...</Text>
        <FooterMenu />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.noOrdersText}>Nenhum pedido encontrado.</Text>
        <FooterMenu />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderContainer}>
            <View style={styles.orderDetails}>
              <Text style={styles.orderTitle}>Pedido #{order.id}</Text>
              <Text style={styles.orderDate}>{new Date(order.created_at).toLocaleDateString('pt-BR')}</Text>
              <Text style={styles.orderPrice}>Total: R${order.total_amount.toFixed(2)}</Text>
              <Text style={styles.orderItems}>Método de Entrega: {order.delivery_method}</Text>
              <Text style={styles.orderAddress}>Endereço: {order.address}</Text>
              <Text style={styles.orderItems}>Itens:</Text>
              {order.items.map(item => (
                <View key={item.cookie_id} style={styles.itemDetails}>
                  <Image source={{ uri: './assets/cookie-icon.png' }} style={styles.image} />
                  <View style={styles.itemText}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
                    <Text style={styles.itemPrice}>Preço: R${item.price.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity onPress={() => handleOrderStatusClick(order.id)}>
                <Text style={styles.orderStatusLink}>Estado do Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E08264',
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 22,
    color: '#FFFFFF',
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
  image: {
    width: 100, 
    height: 100, 
    borderRadius: 35, 
    marginRight: 20,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 18, 
    color: '#888',
  },
  orderPrice: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 18, 
    color: '#888',
  },
  orderAddress: {
    fontSize: 18,
    color: '#888',
  },
  itemDetails: {
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 10,
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#000',
  },
  orderStatusLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 10,
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
