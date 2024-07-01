import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 600 && height >= 600;
const headerHeight = 80;

export default function HomeHeader({ onMenuPress }) {
  const navigateToCart = () => window.location.href = '/cartPage';

  return (
    <ImageBackground
      source={require('../assets/cookie.jpg')}
      style={styles.header}
      imageStyle={styles.imageBackground}
    >
      <View style={styles.overlay} />
      <View style={styles.headerContent}>
        <Pressable style={styles.headerIcon} onPress={onMenuPress}>
          <Icon name="bars" size={RFPercentage(4)} color="#000" />
        </Pressable>
        <View style={styles.headerLogo}>
          <Text style={styles.logoText}>Cookielicia</Text>
        </View>
        <Pressable style={styles.headerIcon} onPress={navigateToCart}>
          <Icon name="shopping-cart" size={RFPercentage(4)} color="#000" />
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cor branca semi-transparente
    borderRadius: 10,
  },
});
