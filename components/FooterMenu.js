import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function FooterMenu() {

  const navigateToCart = () => window.location.href = '/cartPage';
  const navigateToHome = () => window.location.href = '/home';

  return (
      <View style={styles.footerMenu}>
        <ImageBackground
          source={require('../assets/cookie.jpg')}
          style={styles.footerBackground}
          imageStyle={styles.imageStyle} // Adiciona bordas arredondadas à imagem
        >
          <View style={styles.overlay} />

          <View style={styles.footerContent}>
          <Pressable style={styles.footerIcon}>
          <Icon name="home" size={RFPercentage(4)} onPress={navigateToHome} color="#000" />
        </Pressable>
        <Pressable style={styles.footerIcon}>
          <Icon name="shopping-cart" size={RFPercentage(4)} onPress={navigateToCart} color="#000" />
        </Pressable>
        <Pressable style={styles.footerIcon}>
          <Icon name="search" size={RFPercentage(4)} color="#000" />
        </Pressable>
        </View>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  footerMenu: {
    backgroundColor: '#F7C57D',
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  footerBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Garante que a imagem respeite as bordas arredondadas
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Use 'space-around' or 'space-evenly' for equal spacing
    alignItems: 'center',
    width: '100%', 
    height: '100%',
  },
  footerIcon: {
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cor branca semi-transparente
    borderRadius: 10,
  },
});
