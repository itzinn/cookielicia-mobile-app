import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

import Button from '../components/Button';
import Link from '../components/Link';
import UserInput from '../components/UserInput';


const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

function RetanguloCinza({ children }) {
  return (
    <View style={styles.retanguloCinza}>
      {children}
    </View>
  );
}

export default function Register() {
  return (
    
    <View style={styles.container}>
      <ImageBackground
          source={require('../assets/cookie.jpg')}
          style={styles.buttonBackground}
        >
      <View style={styles.overlay} />
      <RetanguloCinza>
        <Text style={styles.title}>Crie sua conta</Text>

        <UserInput placeholder="Nome de usuário" />

        <UserInput placeholder="Email: nome@exemplo.com" />
        
        <UserInput placeholder="Senha" />

        <label style={styles.label}>
          <input type="checkbox"/>
          <Text>Concordo com os <Link label="Termos e Condições" to="[TODO]"/> e
          <Link label="Políticas de Privacidade" to="[TODO]"/></Text>
        </label>

        <Button label="Cadastrar" />

      </RetanguloCinza>
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7C57D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retanguloCinza: {
    backgroundColor: '#d3d1d2',
    borderRadius: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: screenWidth * 0.9,
    maxWidth: 400,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '60px'
  },
  buttonBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.35)', // Cor branca semi-transparente
    borderRadius: 10,
  },
  label: {
    display: 'flex',
    cursor: 'pointer',
  },
});
