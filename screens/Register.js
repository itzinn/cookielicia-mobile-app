import React, { useState } from 'react';
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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        //alert(data.message);
        //redirect to /login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao registrar');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/cookie.jpg')}
        style={styles.buttonBackground}
      >
        <View style={styles.overlay} />
        <RetanguloCinza>
          <Text style={styles.title}>Crie sua conta</Text>
          
          <UserInput 
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
          />
          
          <UserInput 
            placeholder="Email: nome@exemplo.com"
            value={email}
            onChangeText={setEmail}
          />
          
          <UserInput 
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <label style={styles.label}>
            <input type="checkbox" />
            <Text>Concordo com os <Link label="Termos e Condições" to="[TODO]" /> e
              <Link label="Políticas de Privacidade" to="[TODO]" /></Text>
          </label>
          
          <Button label="Cadastrar" onPress={handleRegister} />
          
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
