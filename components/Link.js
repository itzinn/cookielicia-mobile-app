import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Link({ label, to }) {
  //const navigation = useNavigation();

  return (
    //<Pressable onPress={() => navigation.navigate(to)} style={styles.linkContainer}>
    <Pressable>
      <Text style={styles.linkText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    marginVertical: 10,
  },
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
  },
});
