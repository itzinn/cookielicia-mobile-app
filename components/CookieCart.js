import React, { useEffect } from 'react';

//fonte poppins

const CookieCard = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
      <img src="../assets/cookie-icon.png" alt="Cookie Icon" style={styles.cookieIcon} />
        <div style={styles.content}>
          <h2 style={styles.title}>Tradicional Gotas de Chocolate</h2>
          <p style={styles.description}>Massa tradicional com deliciosas gotas de chocolate ao leite</p>
          <p style={styles.price}>R$ 10,00</p>
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
};

export default CookieCard;


