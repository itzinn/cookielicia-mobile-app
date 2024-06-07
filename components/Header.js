import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 600 && height >= 600;
const headerHeight = 80;

export default function Header() {
  return (
    <ImageBackground
      source={require('../assets/cookie.jpg')}
      style={styles.header}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="user" size={RFPercentage(4)} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          <Text style={styles.logoText}>Cookielicia</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="shopping-cart" size={RFPercentage(4)} color="#000" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: headerHeight,
  },
  imageBackground: {
    opacity: 0.8,
    backgroundColor: '#F9A825',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    height: '100%',
  },
  headerIcon: {
    width: isTablet ? width * 0.1 : headerHeight * 0.6,
    alignItems: 'center',
  },
  headerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: isTablet ? RFPercentage(3.5) : RFPercentage(4.5),
    fontWeight: 'bold',
    color: '#000',
  },
});
