import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import RestaurantReservation from '../pages/RestaurantReservation';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

interface HeroSectionProps {
	backgroundImage: string;
}

const HeroSection = styled.div<HeroSectionProps>`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 150px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.566); // Change the last value to adjust the opacity
    z-index: 1;
  }
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

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ContentSection = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: -80px;
  position: relative;
  z-index: 2;
`;

const RestaurantImage = styled.img`
  width: 100%;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const RestaurantName = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const RestaurantDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  color: #ff4a4a;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Reviews = styled.div`
  margin-top: 30px;
`;

const Review = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const ReviewAuthor = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const ReservationButton = styled.button`
  display: inline-block;
  margin-top: 30px;
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

interface Restaurant {
	id: string;
	name: string;
	image: string;
	description: string;
}

const RestaurantOverview: React.FC = () => {
	const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleReservationClick = () => {
    setIsReservationOpen(true);
  };
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const restaurantDoc = doc(db, 'restaurants', id);
				const restaurantData = await getDoc(restaurantDoc);

				if (restaurantData.exists()) {
					setRestaurant({
						id: restaurantData.id,
						name: restaurantData.data().name,
						image: restaurantData.data().image,
						description: restaurantData.data().description,
					});
				}
			}
		};

		fetchData();
	}, [id]);

	if (!restaurant) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<GlobalStyles />
			<GlobalStyle />
			<Navbar />
			<HeroSection backgroundImage={restaurant.image}>
				<HeroOverlay />
				<HeroTitle>{restaurant.name}</HeroTitle>
			</HeroSection>
			<Container>
				<ContentSection>
					<RestaurantImage src={restaurant.image} alt={restaurant.name} />
					<RestaurantName>{restaurant.name}</RestaurantName>
					<RestaurantDescription>{restaurant.description}</RestaurantDescription>

					<SectionTitle>Customer Reviews</SectionTitle>
					<Reviews>
						<Review>
							<ReviewAuthor>John Doe</ReviewAuthor>
							<ReviewText>The food was absolutely fantastic! Highly recommend this place.</ReviewText>
						</Review>
						<Review>
							<ReviewAuthor>Jane Smith</ReviewAuthor>
							<ReviewText>Great atmosphere and friendly staff. Will definitely visit again.</ReviewText>
						</Review>
					</Reviews>

					<SectionTitle>Location</SectionTitle>
					<RestaurantDescription>
						123 Main Street, Riga, Latvia
					</RestaurantDescription>

					<ReservationButton onClick={handleReservationClick}>Make a Reservation</ReservationButton>
        {isReservationOpen && id && <RestaurantReservation restaurantId={id} />}
				</ContentSection>
			</Container>
		</>
	);
};

export default RestaurantOverview;
