import React from 'react';
import { StyleSheet, View, Pressable, Text, ImageBackground } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <ImageBackground
          source={require('../assets/cookie.jpg')}
          style={styles.buttonBackground}
          imageStyle={styles.imageStyle} // Adiciona bordas arredondadas à imagem
        >
          <View style={styles.overlay} /> {/* View para aplicar a opacidade */}

          <Text style={styles.buttonLabel}>{label}</Text>
        </ImageBackground>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 176, 
    height: 40, 
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    margin: 20,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Garante que a imagem respeite as bordas arredondadas
  },
  imageStyle: {
    borderRadius: 20, // Aplica bordas arredondadas diretamente na imagem
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cor branca semi-transparente
    borderRadius: 10,
  },
});
