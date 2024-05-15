import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import Footer from '../organisms/Footer';
import { db } from '../../firebase'; // adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { TbAutomaticGearbox } from "react-icons/tb";
import { keyframes } from 'styled-components';
import { FaUserCheck } from "react-icons/fa6";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    background-color: white;
`;

const movingGradient = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const HeroSection = styled.div`
  color: #ffffff;
  padding: 50px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid #000;
  background: repeating-linear-gradient(45deg, black, #003cff 100px);
  background-size: 200% 200%;
  animation: ${movingGradient} 15s linear infinite;
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
    font-size: 56px;
    font-weight: 800;
    color: #ffffff;
`;

const Specification = styled.div`
    display: flex;
    flex-direction: row;
`;

const SpecificationItem = styled.div`
    display: flex;
    margin: 5px 10px;
    padding: 5px;
    background-color: #000000;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    align-items: center;
`;

const SearchBarContainer = styled.div`
    position: relative;
    width: 300px;
    height: 40px;
    margin-bottom: 20px;
`;

const SearchBar = styled.input.attrs({ type: 'search' })`
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-right: 40px; /* Make room for the search icon */
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
        color: #aaa;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none;
    }
`;

const SearchIcon = styled(FaSearch)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9c9c9c;
`;

const CloseIcon = styled(FaTimes)`
    position: absolute;
    right: 10px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    color: #9c9c9c;
`;

const NotFoundMessage = styled.h2`
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-top: 50px;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 4px solid #2684ff;
  width: 300px;
  padding: 10px;
  margin: 10px;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 23%, #ffffff 60%);
  color: black;
  position: relative;
  border-radius: 20px;

  &:hover .overlay {
    display: flex;
  }
`;

const TextTitle = styled.h2`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  color: black;
  font-weight: 800;;
`;

const Description = styled.p`
  color: #ffffff;
  padding: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const InfoButton = styled.button`
  padding: 10px;
  background-color: #2684ff;
  color: black;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 15px;
`;

const Price = styled.p`
  font-size: 18px;
  padding: 10px;
  color: #ffffff;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #2684ff;
  border-radius: 15px;
  color: black;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 1rem;
`;


interface Product {
  id: string;
  title: string;
  images: string[];
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  specifications: string[];
}

const filterOptions = [
  { value: 'All', label: 'All' },
  { value: 'Cars', label: 'Cars' },
  { value: 'Scooters', label: 'Scooters' },
  { value: 'Boards', label: 'Boards'}
  // Add more options as needed
];

const sortOptions = [
  { value: 'Lowest', label: 'Price: Lowest to Highest' },
  { value: 'Highest', label: 'Price: Highest to Lowest' },
];

const nameOptions = [
  { value: 'A-Z', label: 'Name: A-Z' },
  { value: 'Z-A', label: 'Name: Z-A' },
];

const Rental: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Lowest');
  const [nameSort, setNameSort] = useState('A-Z');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const newProducts = productSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        images: doc.data().images,
        shortDescription: doc.data().shortDescription,
        price: doc.data().price,
        category: doc.data().category,
        specifications: doc.data().specification
      })) as Product[];

      setAllProducts(newProducts);
      setProducts(newProducts);
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    // Set the selectedProduct in the local storage
    localStorage.setItem('selectedProduct', productId);

    // Navigate to the payment page
    navigate('/reservation');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, filter);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    filterProducts(searchTerm, filter);
  };

  const handleSortChange = (sort: string) => {
    setSort(sort);
    sortProducts(sort);
  };
  
  const handleNameSortChange = (nameSort: string) => {
    setNameSort(nameSort);
    sortProductsByName(nameSort);
  };

  const filterProducts = (term: string, filter: string) => {
    let filteredProducts = allProducts;
    if (term) {
      filteredProducts = filteredProducts.filter(product =>
        product.title?.toLowerCase().includes(term.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(term.toLowerCase()) ||
        product.description?.toLowerCase().includes(term.toLowerCase()) ||
        product.price?.toString().includes(term)
      );
    }
    if (filter !== 'All') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filter
      );
    }
    setProducts(filteredProducts);
  };

  const sortProducts = (sort: string) => {
    let sortedProducts = [...products];
    if (sort === 'Lowest') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };
  
  const sortProductsByName = (nameSort: string) => {
    let sortedProducts = [...products];
    if (nameSort === 'A-Z') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setProducts(sortedProducts);
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Container>
        <HeroSection>
          <Title>Welcome to Our Store</Title>
          <img src="https://listcars.com/wp-content/uploads/2022/09/List-Cars-Multiple-Cars.png" width="600px" alt="" />
          <p>Find the best products for your needs</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        </HeroSection>
        <SearchBarContainer>
          <SearchBar placeholder="Search products..." value={searchTerm} onChange={handleSearch} />
          {searchTerm ? <CloseIcon size={20} onClick={() => setSearchTerm('')} /> : <SearchIcon size={20} />}
        </SearchBarContainer>
        <FilterContainer>
          <Select
            options={filterOptions}
            defaultValue={filterOptions[0]}
            onChange={(option) => option && handleFilterChange(option.value)}
          />
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(option) => option && handleSortChange(option.value)}
          />
          <Select
            options={nameOptions}
            defaultValue={nameOptions[0]}
            onChange={(option) => option && handleNameSortChange(option.value)}
          />
        </FilterContainer>
        <ProductList>
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index}>
                <TextTitle>{product.title}</TextTitle>
                <Specification>
                  {product.specifications.map((spec, index) => (
                    <SpecificationItem key={index}>
                      {index === 0 && (
                        <>
                          {spec === 'Manual' && <FaCogs style={{ fontSize: '20px', marginRight: '5px' }}/>}
                          {spec === 'Automatic' && <TbAutomaticGearbox style={{ fontSize: '20px', marginRight: '5px' }}/>}
                        </>
                      )}
                      {index === 1 && <FaUserCheck style={{ fontSize: '20px', marginRight: '5px' }}/>}
                      {spec}
                    </SpecificationItem>
                  ))}
                </Specification>
                <Image src={product.images[0]} alt={product.title} />
                <Description>{product.shortDescription}</Description>
                <Price>${product.price}/Day</Price>
                <Overlay className="overlay">
                  <InfoButton onClick={() => navigate(`/product/${product.id}`)}>Go to product info</InfoButton>
                  <Button onClick={() => handleAddToCart(product.id)}>Add to cart</Button>
                </Overlay>
              </ProductCard>
            ))
          ) : (
            <NotFoundMessage>We don't have such products.<br/>Check back later and maybe we'll add them.<br/>😊</NotFoundMessage>
          )}
        </ProductList>
      </Container>
      <Footer />
    </>
  );
};

export default Rental;