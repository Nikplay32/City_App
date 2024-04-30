import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import Footer from '../organisms/Footer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: black;
`;

const HeroSection = styled.div`
  background-color: #333;
  color: white;
  padding: 50px;
  text-align: center;
  margin-bottom: 20px;
`;

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const SearchBar = styled.input.attrs({ type: 'search' })`
    width: 300px;
    height: 30px;
    margin-bottom: 20px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #333;
  width: 300px;
  padding: 10px;
  margin: 10px;
  background-color: white;
  color: black;
  position: relative;
  border-radius: 20px;

  &:hover {
    opacity: 0.7;
  }

  &:hover .info-button {
    display: block;
  }
`;

const TextTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  color: black;
`;

const Description = styled.p`
  color: black;
  padding: 10px;
`;

const InfoButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  display: none;
`;

const Price = styled.p`
  font-size: 18px;
  padding: 10px;
  color: black;
`;

const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const Rental: React.FC = () => {
    const allProducts = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6', 'Product 7', 'Product 8',]; // Replace with your products
    const [products, setProducts] = useState(allProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterProducts(event.target.value, filter);
    };

    const filterProducts = (term: string, filter: string) => {
        let filteredProducts = allProducts;
        if (term) {
            filteredProducts = filteredProducts.filter(product =>
                product.toLowerCase().includes(term.toLowerCase())
            );
        }
        // Add your filter logic here
        setProducts(filteredProducts);
    };

    return (
        <>
        <GlobalStyles />
        <Navbar />
        <Container>
            <HeroSection>
              <h1>Welcome to Our Store</h1>
              <p>Find the best products for your needs</p>
            </HeroSection>
            <SearchBar placeholder="Search products..." value={searchTerm} onChange={handleSearch} />
            <ProductList>
                {products.map((product, index) => (
                    <ProductCard key={index}>
                    <TextTitle>Product</TextTitle>
                    <Image src='https://source.unsplash.com/random/'></Image>
                    <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</Description>
                    <Price>39.99</Price>
                    <InfoButton className="info-button">Go to product info</InfoButton>
                    <Button>Add to cart</Button>
                    </ProductCard>
                ))}
            </ProductList>
        </Container>
        <Footer />
        </>
    );
};

export default Rental;