import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import Header from '../components/Header';
import CookieCard from '../components/CookieCard';

const { width } = Dimensions.get('window');

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  const navigateToCompleteOrder = () => window.location.href = '/completeOrder';

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/check-authentication', {
          method: 'GET',
          credentials: 'include' // Incluir cookies na requisição
        });

        if (response.ok) {
          setAuthenticated(true); // Atualiza o estado para autenticado se a resposta for OK
        } else {
          window.location.href = '/login'; // Redireciona para o login se não estiver autenticado
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Tratar erro de forma apropriada, se necessário
        window.location.href = '/login'; // Em caso de erro, redireciona para o login
      }
    };

    checkAuthentication();

    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart-details', {
          credentials: 'include', 
        });
        const data = await response.json();
        setCartItems(data);

        // Calculate total
        const subtotal = data.reduce((sum, item) => sum + parseFloat(item.newPrice.replace('R$', '').replace(',', '.')) * item.quantity, 0);
        const deliveryFee = 3.00;
        const serviceFee = 0.00;
        setSubtotal(subtotal);
        setTotal(subtotal + deliveryFee + serviceFee);
      } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  
    const newSubtotal = cartItems.reduce((sum, item) =>
      item.id === productId
        ? sum + parseFloat(item.newPrice.replace('R$', '').replace(',', '.')) * newQuantity
        : sum + parseFloat(item.newPrice.replace('R$', '').replace(',', '.')) * item.quantity,
      0
    );
  
    const deliveryFee = 3.00;
    const serviceFee = 0.00;
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + deliveryFee + serviceFee);
  };  

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    const newSubtotal = cartItems.reduce((sum, item) =>
      item.id === productId
        ? sum
        : sum + parseFloat(item.newPrice.replace('R$', '').replace(',', '.')) * item.quantity,
      0
    );
    const deliveryFee = 3.00;
    const serviceFee = 0.00;
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + deliveryFee + serviceFee);
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return authenticated ? (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Seu Carrinho</Text>
        {cartItems.map(item => (
          <View style={styles.cookieCardContainer} key={item.id}>
            <CookieCard 
              image={require('../assets/cookie-icon.png')}
              title={item.title}
              description={item.description}
              price={item.newPrice}
              quantity={item.quantity}
              productId={item.id} // Passe o productId para o CookieCard
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem} // Pass the handleRemoveItem function
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar mais Itens</Text>
        </TouchableOpacity>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Resumo do Pedido</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Taxa de entrega</Text>
            <Text style={styles.summaryText}>R$ 3,00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Taxa de Serviço</Text>
            <Text style={styles.summaryText}>R$ 0,00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalText}>Total</Text>
            <Text style={styles.summaryTotalText}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={navigateToCompleteOrder}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  ):null;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  cookieCardContainer: {
    width: '100%',
    maxWidth: 600,
    marginVertical: 10,
    paddingHorizontal: 16,
    margin: 100,
  },
  addButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  summaryContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 16,
    backgroundColor: '#EDEDE',
    borderRadius: 5,
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#DDD',
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
