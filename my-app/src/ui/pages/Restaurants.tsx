import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #ff6b6b, #ff4a4a);
  color: #fff;
  padding: 150px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  z-index: 2;
  position: relative;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 20px 0 0;
  z-index: 2;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: -50px auto 0;
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

const RestaurantCard = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
`;

interface RestaurantImageProps {
  src: string;
}

const RestaurantImage = styled.div<RestaurantImageProps>`
  width: 100%;
  height: 220px;
  background: url(${props => props.src}) center/cover no-repeat;
  transition: transform 0.3s ease;

  ${RestaurantCard}:hover & {
    transform: scale(1.1);
  }
`;

const RestaurantInfo = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
`;

const RestaurantName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

const RestaurantDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 15px;
  padding: 12px 25px;
  background: linear-gradient(135deg, #ff6b6b, #ff4a4a);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff4a4a, #ff6b6b);
    transform: scale(1.05);
  }
`;

const HighlightList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
`;

const HighlightItem = styled.li`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;

  &:before {
    content: '•';
    margin-right: 5px;
    color: #ff6b6b; /* You can adjust the color of the bullet point */
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
