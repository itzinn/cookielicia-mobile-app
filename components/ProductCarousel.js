import React, { useState, useEffect } from 'react';
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

export default function ProductCarousel({ deviceType }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/cookies');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

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
    paddingTop: 50,
  },
  carouselItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};
