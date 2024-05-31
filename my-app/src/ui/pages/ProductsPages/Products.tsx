import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import Footer from '../../organisms/Footer';
import { db, auth } from '../../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import { TbAutomaticGearbox } from "react-icons/tb";
import { keyframes } from 'styled-components';
import { FaUserCheck } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import {
  Container,
  SubscriptionRibbon,
  HeroSection,
  HeroImage,
  ProductList,
  Title,
  GoToProductButton,
  PaginationContainer,
  PageNumber,
  PageButton,
  AddToCartButton,
  Specification,
  SpecificationItem,
  SearchBarContainer,
  SearchBar,
  SearchIcon,
  CloseIcon,
  NotFoundMessage,
  ProductCard,
  TextTitle,
  Description,
  Overlay,
  InfoButton,
  Price,
  Button,
  Image,
  FilterContainer,
} from '../Products.styles';

interface Product {
  id: string;
  title: string;
  images: string[];
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  specifications: string[];
  subscribers_only: string;
}

const filterOptions = [
  { value: 'All', label: 'All' },
  { value: 'Cars', label: 'Cars' },
  { value: 'Scooters', label: 'Scooters' },
  { value: 'Boards', label: 'Boards' },
  { value: 'SubscribersOnly', label: 'Subscribers Only' },
  { value: 'Free', label: 'Free' },
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
  const [isSubscribed, setIsSubscribed] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const productsOnCurrentPage = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        specifications: doc.data().specification,
        subscribers_only: doc.data().subscribers_only ? 'true' : 'false'
      })) as Product[];

      setAllProducts(newProducts);
      setProducts(newProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      setIsLoading(true);
      const userId = auth.currentUser?.uid;
      if (userId) {
        const paymentsCol = collection(db, 'payments');
        const paymentSnapshot = await getDocs(paymentsCol);
        const userPayment = paymentSnapshot.docs.find(doc => doc.data().userId === userId);

        if (userPayment) {
          if (userPayment.data().status === 'success') {
            setIsSubscribed('true');
            setIsLoading(false);
          } else {
            console.log(`ERROR`);
          }
        } else {
          console.log(`No payment found for user`);
        }
      } else {
        console.log('No user is currently logged in');
      }
      setIsLoading(false);
    };

    fetchSubscriptionStatus();
  }, []);

  const navigate = useNavigate();

  const handleAddToCart = async (productId: string) => {
    const userId = auth.currentUser?.uid;
    const product = allProducts.find(product => product.id === productId);
  
    if (userId) {
      const paymentsCol = collection(db, 'payments');
      const paymentSnapshot = await getDocs(paymentsCol);
      const userPayment = paymentSnapshot.docs.find(doc => doc.data().userId === userId);
  
      if (product?.subscribers_only === 'true' && userPayment && userPayment.data().status === 'success') {
        localStorage.setItem('selectedProduct', productId);
  
        navigate('/reservation');
      } else if (product?.subscribers_only === 'false') {
        localStorage.setItem('selectedProduct', productId);
  
        navigate('/reservation');
      } else {
        toast.error('Only subscribed users can rent premium class products. Please subscribe to continue.');
      }
    } else {
      toast.error('You must be logged in to rent products.');
    }
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
    if (filter === 'SubscribersOnly') {
      if (isSubscribed === 'true') {
        filteredProducts = filteredProducts.filter(product =>
          product.subscribers_only === 'true'
        );
      } else {
        filteredProducts = allProducts;
      }
    } else if (filter === 'Free') {
      filteredProducts = filteredProducts.filter(product =>
        product.subscribers_only === 'false'
      );
    } else if (filter !== 'All') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filter
      );
    }
    
    if (term) {
      filteredProducts = filteredProducts.filter(product =>
        product.title?.toLowerCase().includes(term.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(term.toLowerCase()) ||
        product.description?.toLowerCase().includes(term.toLowerCase()) ||
        product.price?.toString().includes(term)
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ToastContainer />
          <GlobalStyles />
          <Navbar />
          <Container>
            <HeroSection>
              <Title>Welcome to Our Store</Title>
              <HeroImage src="https://listcars.com/wp-content/uploads/2022/09/List-Cars-Multiple-Cars.png" width="600px" alt="" />
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
                styles={{ control: (base) => ({ ...base, width: "250px" }) }}
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
              {productsOnCurrentPage.length > 0 ? (
                productsOnCurrentPage.map((product, index) => (
                  <ProductCard key={index}>
                    {product.subscribers_only === 'true' && <SubscriptionRibbon>Subscription Only</SubscriptionRibbon>}
                    <TextTitle>{product.title}</TextTitle>
                    <Specification>
                      {product.specifications.map((spec, index) => (
                        <SpecificationItem key={index}>
                          {index === 0 && (
                            <>
                              {spec === 'Manual' && <FaCogs style={{ fontSize: '20px', marginRight: '5px' }} />}
                              {spec === 'Automatic' && <TbAutomaticGearbox style={{ fontSize: '20px', marginRight: '5px' }} />}
                            </>
                          )}
                          {index === 1 && <FaUserCheck style={{ fontSize: '20px', marginRight: '5px' }} />}
                          {spec}
                        </SpecificationItem>
                      ))}
                    </Specification>
                    <Image src={product.images[0]} alt={product.title} />
                    <Description>{product.shortDescription}</Description>
                    <Price>{product.price}€/Day</Price>
                    <Overlay className="overlay">
                      <InfoButton onClick={() => navigate(`/product/${product.id}`)}>Go to product info</InfoButton>
                      <AddToCartButton onClick={() => handleAddToCart(product.id)}>Add to cart</AddToCartButton>
                    </Overlay>
                  </ProductCard>
                ))
              ) : (
                <NotFoundMessage>
                  <h2>Oops!</h2>
                  <p>We couldn't find any products that match your search.</p>
                  <p>Please try again with different keywords.</p>
                </NotFoundMessage>
              )}
            </ProductList>
            <PaginationContainer>
              <PageButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FaChevronLeft />
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <PageNumber
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{ color: pageNumber === currentPage ? '#007bff' : 'black' }}
                >
                  {pageNumber}
                </PageNumber>
              ))}
              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaChevronRight />
              </PageButton>
            </PaginationContainer>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Rental;