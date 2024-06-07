import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';

import Button from './components/Button';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

function RetanguloCinza({ children }) {
  return (
    <View style={styles.retanguloCinza}>
      {children}
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <RetanguloCinza>
        <Text>Entre com sua conta</Text>

        <Text>Email</Text>
        <input style={styles.input} />
        <Text>Senha</Text>
        <input style={styles.input} />

        <Text>Esqueceu sua senha?</Text>

        <Button label="Enviar" />

        <Text>Ainda não possui conta? Registre-se</Text>
      </RetanguloCinza>
      <StatusBar style="auto" />
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
    width: screenWidth * 0.8,
    maxWidth: 400,
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
