import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import { db } from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
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
  HighlightItem
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

const BestRestaurantsInRiga: React.FC = () => {
  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const restaurantsCol = collection(db, 'restaurants');
      const restaurantSnapshot = await getDocs(restaurantsCol);
      const newRestaurants = restaurantSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        description: doc.data().description,
        highlights: doc.data().highlights || [], // Assuming highlights is an array of strings
      })) as Restaurant[];

      setRestaurantsData(newRestaurants);
    };

    fetchData();
  }, []);

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
      </HeroSection>
      <Container>
        <RestaurantGrid>
          {restaurantsData.map((restaurant, index) => (
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
