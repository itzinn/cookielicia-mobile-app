import { StyleSheet, View, TextInput } from 'react-native';

export default function UserInput({ placeholder }) {
  return (
    <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder={placeholder}
          placeholderTextColor="#827f80"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginBottom: '20px',
  },
  input: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000000',
  },
  inputBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
