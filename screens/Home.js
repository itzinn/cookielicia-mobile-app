// Primeiramente fazendo alguns imports necessários para o código

import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, Dimensions, TouchableOpacity } from 'react-native';

// Importando componentes personalizados
// Componentes são peças reutilizáveis da interface do usuário, que encapsulam a lógica e a renderização de um trecho específico da interface de usuário
// Neste caso, estamos importando três componentes personalizados:
// FooterMenu, HomeHeader e ProductCarousel, que representam diferentes partes da nossa tela inicial
import FooterMenu from '../components/FooterMenu';
import HomeHeader from '../components/HomeHeader';
import ProductCarousel from '../components/ProductCarousel';

// Obtendo a largura da tela do dispositivo
const { width } = Dimensions.get('window');

// Componente principal da tela inicial
export default function Home() {
  const [authenticated, setAuthenticated] = useState(false); // Estado para controle de autenticação
  const menuAnimation = useRef(new Animated.Value(-width)).current; // Animação para o menu que começa fora da tela

  // Função para verificar a autenticação do usuário
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/home', {
          method: 'GET',
          credentials: 'include' // Inclui cookies na requisição
        });

        if (response.ok) {
          setAuthenticated(true); // Atualiza o estado para autenticado se a resposta for OK
        } else {
          window.location.href = '/login'; // Redireciona para a página de login se não estiver autenticado
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '/login'; // Redireciona para a página de login em caso de erro
      }
    };

    checkAuthentication(); // Chama a função para verificar a autenticação ao montar o componente
  }, []); // Array vazio como segundo argumento faz com que o useEffect execute apenas uma vez

  // Função para abrir o menu animado
  const openMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0, // Animação move o menu para a posição visível
      duration: 300, // Duração da animação em milissegundos
      useNativeDriver: true, // Usa o driver nativo para melhor desempenho
    }).start();
  };

  // Função para fechar o menu animado
  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -width, // Animação move o menu para fora da tela
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Renderiza o conteúdo da tela apenas se o usuário estiver autenticado
  return authenticated ? (
    <View style={styles.container}>
      <HomeHeader onMenuPress={openMenu} /> {/* Cabeçalho com botão de menu */}
      
      {/* Seção de Ofertas */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Ofertas</Text>
        <Pressable>
          <Text style={styles.headerLink}>Ver mais</Text>
        </Pressable>
      </View>
      <ProductCarousel /> {/* Componente de carrossel de produtos */}

      {/* Seção de Cookies */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Cookies</Text>
        <Pressable>
          <Text style={styles.headerLink}>Ver mais</Text>
        </Pressable>
      </View>
      <ProductCarousel /> {/* Outro carrossel de produtos */}

      <FooterMenu /> {/* Menu de rodapé */}

      {/* Menu lateral animado */}
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

// Estilos para os componentes, parte de styles da home page
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
