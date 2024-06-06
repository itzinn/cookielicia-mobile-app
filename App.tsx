import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

function RetanguloCinza({ children }) {
  const rectangleHeight = screenHeight * 0.8; 
  const rectangleWidth = screenWidth * 0.8;
  return (
    <View style={[styles.retanguloCinza, { height: rectangleHeight, width: rectangleWidth }]}>
      {children}
    </View>
  );
}

function InputUsuario({}) {
  const rectangleHeight = screenHeight * 0.1; 
  const rectangleWidth = screenWidth * 0.7;
  return (
    <View style={[styles.inputUsuario, { height: rectangleHeight, width: rectangleWidth }]} />
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <RetanguloCinza>
        <InputUsuario />
        <InputUsuario />
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
  },
  inputUsuario: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
  },
});
