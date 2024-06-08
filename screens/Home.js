import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';


export default function Home() {
  return (

    <View style={styles.container}>
        <Header />

        <FooterMenu/>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
    },
});
