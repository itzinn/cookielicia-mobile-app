import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, CheckBox } from 'react-native';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function CompleteOrder() {
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Delivery');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart-details', {
          credentials: 'include'
        });
        const data = await response.json();
        setCartItems(data);

        const subtotal = data.reduce((sum, item) => sum + parseFloat(item.newPrice.replace('R$', '').replace(',', '.')) * item.quantity, 0);
        const deliveryFee = deliveryMethod === 'Retirada' ? 0 : 3.00;
        setTotalAmount(subtotal + deliveryFee);
      } catch (error) {
        console.error('Erro ao buscar detalhes do carrinho:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();

    const fetchUserAddress = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-address', {
          credentials: 'include'
        });
        const data = await response.json();
        setAddress(data.address);
      } catch (error) {
        console.error('Erro ao buscar endereço do usuário:', error);
      }
    };

    fetchUserAddress();
  }, [deliveryMethod]);

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch('http://localhost:3000/complete-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ deliveryMethod, address, cartItems, totalAmount })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Pedido criado com sucesso! ID do pedido: ' + data.orderId);
      } else {
        alert('Erro ao criar pedido: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao criar pedido');
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Finalizar</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de entrega</Text>
          <View style={styles.optionContainer}>
            <CheckBox
              value={deliveryMethod === 'Delivery'}
              onValueChange={() => setDeliveryMethod('Delivery')}
            />
            <Text style={styles.optionText}>Delivery</Text>
          </View>
          <View style={styles.optionContainer}>
            <CheckBox
              value={deliveryMethod === 'Retirada'}
              onValueChange={() => setDeliveryMethod('Retirada')}
            />
            <Text style={styles.optionText}>Retirada</Text>
          </View>
          {deliveryMethod === 'Delivery' && (
            <Text style={styles.deliveryFee}>Taxa de entrega - R$ 3,00</Text>
          )}
        </View>

        {deliveryMethod === 'Delivery' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu endereço"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pedido</Text>
          {cartItems.map((item) => (
            <Text key={item.id} style={styles.orderItem}>{item.quantity}x {item.title} - {item.newPrice}</Text>
          ))}
        </View>

        <Text style={styles.total}>R$ {totalAmount.toFixed(2)} / {cartItems.length} Itens</Text>

        <TouchableOpacity style={styles.button} onPress={handleCompleteOrder}>
          <Text style={styles.buttonText}>FINALIZAR</Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterMenu />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#FCB040',
    width: '100%',
    paddingVertical: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 19,
    textAlign: 'center',
  },
  deliveryFee: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  orderItem: {
    fontSize: 18,
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

