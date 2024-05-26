import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import RestaurantReservation from './RestaurantReservation';
import {
  Container,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroOverlay,
  ContentSection,
  RestaurantImage,
  RestaurantName,
  RestaurantDescription,
  SectionTitle,
  Reviews,
  Review,
  ReviewAuthor,
  ReviewText,
  ReservationButton
} from './RestaurantsOverview.styles';

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
