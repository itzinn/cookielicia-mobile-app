import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
const cookieIcon = require('../assets/cookie-icon.png');
import FooterAdd from '../components/FooterAdd';

export default function ProductPage() {

  return (
    <View style={styles.container}>
    <Header />
    <FooterAdd>
        
    </FooterAdd>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EDEDED',
    },
    scrollView: {
      padding: 16,
      alignItems: 'center',
    }
  });