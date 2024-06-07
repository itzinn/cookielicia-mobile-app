import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';

import FooterMenu from '../components/FooterMenu';

export default function Home() {
  return (

    <View style={styles.container}>
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
