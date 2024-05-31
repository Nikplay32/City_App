import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import { db } from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; 
import {
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  Container,
  RestaurantGrid,
  RestaurantCard,
  RestaurantImage,
  RestaurantInfo,
  RestaurantName,
  RestaurantDescription,
  Button,
  HighlightList,
  HighlightItem,
  SearchBar,
  SearchBarContainer,
  SearchIcon,
  CloseIcon,
  FiltersContainer
} from './Restaurants.styles';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
  }
`;

interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  highlights: string[];
}
type OptionType = { value: string; label: string; };

const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    width: 200, 
  }),
  option: (provided: any) => ({
    ...provided,
    color: 'black',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'black', 
  }),
};

const BestRestaurantsInRiga: React.FC = () => {
  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add this line
  const restaurantOptions = [
    { value: 'all', label: 'All' },
    ...restaurantsData.map(restaurant => ({ value: restaurant.id, label: restaurant.name })),
  ];
  const [sortOption, setSortOption] = useState('A-Z'); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      const restaurantsCol = collection(db, 'restaurants');
      const restaurantSnapshot = await getDocs(restaurantsCol);
      const newRestaurants = restaurantSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        description: doc.data().description,
        highlights: doc.data().highlights || [],
      })) as Restaurant[];

      setRestaurantsData(newRestaurants);
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSelectChange = (selectedOption: any) => {
    setSelectedRestaurant(selectedOption);
  };
  const handleSortChange = (selectedOption: any) => {
    setSortOption(selectedOption.value);
  };

  const sortOptions = [
    { value: 'A-Z', label: 'Name (A-Z)' },
    { value: 'Z-A', label: 'Name (Z-A)' },
    // Add more options here if needed
  ];
  

  const goToRestaurant = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <>
      <GlobalStyles />
      <GlobalStyle />
      <Navbar />
      <HeroSection>
        <HeroTitle>Top Restaurants in Riga</HeroTitle>
        <HeroSubtitle>Discover the best dining experiences in the city</HeroSubtitle>
        <SearchBarContainer>
          <SearchBar placeholder="Search restaurants..." value={searchTerm} onChange={handleSearch} />
          {searchTerm ? <CloseIcon size={20} onClick={() => setSearchTerm('')} /> : <SearchIcon size={20} />}
        </SearchBarContainer>
        <FiltersContainer>
          <Select
            options={restaurantOptions}
            value={selectedRestaurant}
            onChange={handleSelectChange}
            styles={selectStyles} 
          />
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={handleSortChange}
            styles={selectStyles} 
          />
        </FiltersContainer>
      </HeroSection>
      <Container>
        <RestaurantGrid>
          {restaurantsData
            .filter(restaurant => {
              return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
                (!selectedRestaurant || selectedRestaurant.value === 'all' || restaurant.id === selectedRestaurant.value);
            })
            .sort((a, b) => {
              switch (sortOption) {
                case 'A-Z':
                  return a.name.localeCompare(b.name);
                case 'Z-A':
                  return b.name.localeCompare(a.name);
                default:
                  return 0;
              }
            })
            .map((restaurant, index) => (
              <RestaurantCard key={index}>
                <RestaurantImage src={restaurant.image} />
                <RestaurantInfo>
                  <RestaurantName>{restaurant.name}</RestaurantName>
                  <RestaurantDescription>{restaurant.description}</RestaurantDescription>
                  <HighlightList>
                    {restaurant.highlights.map((highlight, idx) => (
                      <HighlightItem key={idx}>{highlight}</HighlightItem>
                    ))}
                  </HighlightList>
                  <Button onClick={() => goToRestaurant(restaurant.id)}>Learn More</Button>
                </RestaurantInfo>
              </RestaurantCard>
            ))}
        </RestaurantGrid>
      </Container>
    </>
  );
};

export default BestRestaurantsInRiga;