import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Link, Pressable } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import HomeHeader from '../components/HomeHeader';
import ProductCarousel from '../components/ProductCarousel';

export default function Home() {
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
  }, []); // Executa apenas uma vez ao montar o componente

  // Renderiza o conteúdo da página somente se estiver autenticado
  return authenticated ? (
    <View style={styles.container}>
      <HomeHeader />
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
});
