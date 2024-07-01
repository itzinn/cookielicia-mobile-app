// CompleteOrder.js

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import DeliveryMethodSection from '../components/DeliveryMethodSection';
import AddressSection from '../components/AddressSection';
import OrderItemsSection from '../components/OrderItemsSection';
import CompleteOrderButton from '../components/CompleteOrderButton';

export default function CompleteOrder() {
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Delivery');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);


  //encaminha pro status do pedido
  const navigateToOrderStatus = (orderId) => {
    window.location.href = `/orderStatus?orderId=${orderId}`;
  };

  //verificacao de login
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/home', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '/login';
      }
    };

    checkAuthentication();

    //busca detalhes do carrinho
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

    //busca endereco
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

  //salva o endereco
  const handleSaveAddress = async () => {
    try {
      const response = await fetch('http://localhost:3000/update-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
        credentials: 'include'
      });

      if (response.ok) {
        alert('Endereço salvo com sucesso');
      } else {
        console.error('Erro ao salvar o endereço');
      }
    } catch (error) {
      console.error('Erro ao salvar o endereço:', error);
    }
  };

  //finaliza o pedido
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
      //limpa carrinho apos compra
      if (response.ok) {
        await fetch('http://localhost:3000/clear-cart', {
          method: 'POST',
          credentials: 'include'
        });
        navigateToOrderStatus(data.orderId);
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

  return authenticated ? (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Finalizar</Text>

        <DeliveryMethodSection
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
        />

        {deliveryMethod === 'Delivery' && (
          <AddressSection
            address={address}
            setAddress={setAddress}
            handleSaveAddress={handleSaveAddress}
          />
        )}

        <OrderItemsSection cartItems={cartItems} />

        <Text style={styles.total}>R$ {totalAmount.toFixed(2)} / {cartItems.length} Itens</Text>

        <CompleteOrderButton onPress={handleCompleteOrder} />
      </ScrollView>
      <FooterMenu />
    </View>
  ) : null;
}


//estilos da pagina
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
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
