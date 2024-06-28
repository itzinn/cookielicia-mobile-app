import React, { useEffect } from 'react';

const CookieDescriptionCard = ({title, description, price }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.content}>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.description}>{description}</p>
          <p style={styles.price}>{price}</p>
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
    padding: '20px',
    position: 'relative',
    backgroundColor: '#EDEDED',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: '20px',
    padding: '20px',
    width: '90%',
    maxWidth: '600px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flexDirection: 'column',
  },
  cookieIcon: {
    width: '120px',
    height: '120px',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    margin: '0',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  description: {
    margin: '10px 0',
    fontSize: '18px',
    color: '#666',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
  price: {
    margin: '10px 0',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FCB040',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
  },
};

export default CookieDescriptionCard;
