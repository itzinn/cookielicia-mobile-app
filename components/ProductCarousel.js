import React from 'react';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import ProductCard from './ProductCard';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const products = [
    {
      id: '1',
      title: 'Tradicional C.Branco',
      oldPrice: 'R$ 10,00',
      newPrice: 'R$ 6,50',
      image: require('../assets/cookie-icon.png'),
    },
    {
      id: '2',
      title: 'Cookie de Chocolate',
      oldPrice: 'R$ 12,00',
      newPrice: 'R$ 8,00',
      image: require('../assets/cookie-icon.png'),
    },
    {
      id: '3',
      title: 'Cookie de Aveia e Mel',
      oldPrice: 'R$ 11,00',
      newPrice: 'R$ 7,00',
      image: require('../assets/cookie-icon.png'),
    },
    {
      id: '4',
      title: 'Cookie de Amendoim',
      oldPrice: 'R$ 9,00',
      newPrice: 'R$ 5,50',
      image: require('../assets/cookie-icon.png'),
    },
    {
      id: '5',
      title: 'Cookie de Canela',
      oldPrice: 'R$ 13,00',
      newPrice: 'R$ 9,00',
      image: require('../assets/cookie-icon.png'),
    },
    {
      id: '6',
      title: 'Cookie de Nozes',
      oldPrice: 'R$ 14,00',
      newPrice: 'R$ 10,00',
      image: require('../assets/cookie-icon.png'),
    },
  ];  

export default function ProductCarousel({ deviceType }) {
  return (
    <Carousel 
      responsive={responsive}
      infinite={true}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      style={styles.carouselContainer}
      
    >
      {products.map((product) => (
        <div key={product.id} style={styles.carouselItem}>
          <ProductCard item={product} />
        </div>
      ))}
    </Carousel>
  );
}

const styles = {
    carouselContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50, // Adiciona margem do topo
    },
    carouselItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  };