import React, { useEffect, useState } from 'react';

//fonte poppins

const CookieCard = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="../assets/cookie-icon.png" alt="Cookie Icon" style={styles.cookieIcon} />
        <div style={styles.content}>
          <h2 style={styles.title}>Tradicional Gotas de Chocolate</h2>
          <p style={styles.description}>Massa tradicional com deliciosas gotas de chocolate ao leite</p>
          <p style={styles.price}>R$ 10,00</p>
        </div>
        <div style={styles.quantityContainer}>
          <button style={styles.quantityButton} onClick={decreaseQuantity}>-</button>
          <span style={styles.quantity}>{quantity}</span>
          <button style={styles.quantityButton} onClick={increaseQuantity}>+</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#EDEDED',
    padding: '20px',
    position: 'relative',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: '20px',
    padding: '20px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'relative', 
  },
  cookieIcon: {
    width: '66px', 
    height: '66px',
    marginRight: '20px',
    alignSelf: 'center', 
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  description: {
    margin: '5px 0',
    fontSize: '16px',
    color: '#666',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  price: {
    margin: '10px 0',
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#FFA500',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '-15px', 
    bottom: '-15px',
    backgroundColor: '#FCB040',
    borderRadius: '100%',
    padding: '5px 10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '44px', 
    height: '54px',
  },
  quantityButton: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    margin: '0 5px',
  },
  quantity: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'arial',
  },
};

export default CookieCard;
