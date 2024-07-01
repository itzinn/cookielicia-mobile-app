//Primeiramente alguns imports necessários para o bom funcionamento do código

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Alert } from 'react-native';

// Importando componentes personalizados
// Os componentes personalizados encapsulam tanto a lógica quanto o design neste quesito
// Neste caso, estamos importando três componentes: Button, Link e UserInput
import Button from '../components/Button';
import Link from '../components/Link';
import UserInput from '../components/UserInput';

// Obtendo as dimensões da tela do dispositivo
const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Componente RetanguloCinza que cria uma caixa cinza arredondada para envolver outros elementos
function RetanguloCinza({ children }) {
  return (
    <View style={styles.retanguloCinza}>
      {children}
    </View>
  );
}

// Componente principal da tela de login
export default function Login() {
  const [email, setEmail] = useState(''); // Estado para armazenar o email
  const [password, setPassword] = useState(''); // Estado para armazenar a senha

  // Função para lidar com o login quando o botão "Entrar" é pressionado
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envia o email e senha no corpo da requisição
        credentials: 'include' // Inclui cookies na requisição
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = '/home'; // Redireciona para a tela inicial se o login for bem-sucedido
      } else {
        alert(data.message); // Mostra uma mensagem de erro se o login falhar
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao logar'); // Mostra uma mensagem de erro genérica em caso de falha na requisição
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/cookie.jpg')} style={styles.buttonBackground}>
        <View style={styles.overlay} />
        <RetanguloCinza>
          <Text style={styles.title}>Entre com sua conta</Text>

          {/* Campos de entrada para email e senha */}
          <UserInput placeholder="Email: nome@exemplo.com" value={email} onChangeText={setEmail} />
          <UserInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

          {/* Link para recuperação de senha */}
          <Link label="Esqueceu sua senha?" to="[TODO]" />

          {/* Botão para submeter o login */}
          <Button label="Entrar" onPress={handleLogin} />

          {/* Link para a página de registro */}
          <Text>
            Ainda não possui conta? <Link label="Registre-se" to="/register" />
          </Text>
        </RetanguloCinza>
        <StatusBar style="auto" /> {/* Barra de status do Expo */}
      </ImageBackground>
    </View>
  );
}

// Estilos para os componentes, parte de styles da pagina de login
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
    marginBottom: '60px',
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
});
