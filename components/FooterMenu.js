import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export default function FooterMenu() {
  return (
      <View style={styles.footerMenu}>
        <ImageBackground
          source={require('../assets/cookie.jpg')}
          style={styles.footerBackground}
          imageStyle={styles.imageStyle} // Adiciona bordas arredondadas à imagem
        >
          <View style={styles.overlay} />

        <Text>Footer Menu</Text>

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cor branca semi-transparente
    borderRadius: 10,
  },
});
