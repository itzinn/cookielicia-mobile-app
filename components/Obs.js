import React, { useEffect } from 'react';

const Observacoes = () => {

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }, []);
    

      const styles = {
        container: {
          backgroundColor: '#e0e0e0',
          padding: '15px', 
          borderRadius: '20px',
          width: '100%', 
          maxWidth: '400px', 
          margin: '20px auto', 
          textAlign: 'left',
        },
        title: {
          fontSize: '18px' ,
          fontWeight: 'bold',
          marginBottom: '5px',
          fontFamily: 'Poppins'
        },
        input: {
          width: '95%', 
          padding: '10px', 
          borderRadius: '15px',
          border: '1px solid #ccc',
          fontSize: '14px',
          textAlign: 'center',
          
        },
      };
    
      return (
        <div style={styles.container}>
          <div style={styles.title}>Observações</div>
          <input
            type="text"
            placeholder="Ex. Mandar separado, embalagem para presente, etc."
            style={styles.input}
          />
        </div>
      );
    };

export default Observacoes;
