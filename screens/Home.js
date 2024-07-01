import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, Dimensions, TouchableOpacity } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import HomeHeader from '../components/HomeHeader';
import ProductCarousel from '../components/ProductCarousel';

const { width } = Dimensions.get('window');

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-width)).current; // Menu starts off-screen

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
        window.location.href = '/login'; // Em caso de erro, redireciona para o login
      }
    };

    checkAuthentication();
  }, []); // Executa apenas uma vez ao montar o componente

  const openMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return authenticated ? (
    <View style={styles.container}>
      <HomeHeader onMenuPress={openMenu} />
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Ofertas</Text>
        <Pressable>
          <Text style={styles.headerLink}>Ver mais</Text>
        </Pressable>
      </View>
      <ProductCarousel />

      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cookies</Text>
        <Pressable>
          <Text style={styles.headerLink}>Ver mais</Text>
        </Pressable>
      </View>

      <ProductCarousel />

      <FooterMenu />

      <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
        <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { window.location.href = '/home'; closeMenu(); }}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { window.location.href = '/cartpage'; closeMenu(); }}>
          <Text style={styles.menuItem}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { window.location.href = '/pastorders'; closeMenu(); }}>
          <Text style={styles.menuItem}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { window.location.href = '/contact'; closeMenu(); }}>
          <Text style={styles.menuItem}>Contato</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  ) : null; // Se não estiver autenticado, não renderiza nada (ou uma mensagem de carregamento)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75, // Ocupa 75% da largura da tela
    backgroundColor: '#fbc364',
    padding: 20,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'red',
    fontSize: 18,
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
  },
});
