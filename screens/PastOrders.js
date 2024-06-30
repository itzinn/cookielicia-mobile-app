import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function PastOrders() {
  const [activeTab, setActiveTab] = useState('Ativo');

  const renderTabContent = () => {
    if (activeTab === 'Ativo') {
      return (
        <View style={styles.orderContainer}>
          <Image source={{ uri: './assets/cookie-icon.png' }} style={styles.image} />
          <View style={styles.orderDetails}>
            <Text style={styles.orderTitle}>Tradicional</Text>
            <Text style={styles.orderDate}>XXX</Text>
            <Text style={styles.orderPrice}>R$10,00</Text>
            <Text style={styles.orderItems}>2 items</Text>
            <Text style={styles.orderStatus}>Estado do Pedido</Text>
          </View>
        </View>
      );
    } else if (activeTab === 'Completadas') {
      return <Text style={styles.noOrdersText}>Nenhum pedido completado.</Text>;
    } else if (activeTab === 'Canceladas') {
      return <Text style={styles.noOrdersText}>Nenhum pedido cancelado.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Ativo')} style={[styles.tab, activeTab === 'Ativo' && styles.activeTab]}>
          <Text style={styles.tabText}>Ativo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Completadas')} style={[styles.tab, activeTab === 'Completadas' && styles.activeTab]}>
          <Text style={styles.tabText}>Completadas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Canceladas')} style={[styles.tab, activeTab === 'Canceladas' && styles.activeTab]}>
          <Text style={styles.tabText}>Canceladas</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {renderTabContent()}
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
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    maxWidth: 400, 
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    color: '#888',
  },
  orderStatus: {
    fontSize: 20,
    color: '#F8B400',
    marginTop: 10,
  },
  noOrdersText: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
