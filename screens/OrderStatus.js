import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Link, Pressable } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar'


export default function OrderStatus () {

    const [step, setStep] = useState(1); // Controla o passo atual

  return (

    <View style={styles.container}>
      <Header />

      <ProgressBar step={step} />

      <FooterMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
});
