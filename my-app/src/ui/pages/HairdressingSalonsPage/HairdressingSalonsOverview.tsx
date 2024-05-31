import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import SalonReservation from './HairdressingForm';
import {
	Container,
	HeroSection,
	HeroTitle,
	HeroSubtitle,
	HeroOverlay,
	ContentSection,
	SalonImage,
	SalonName,
	SalonDescription,
	SectionTitle,
	Reviews,
	Review,
	ReviewAuthor,
	ReviewText,
	ReservationButton,
	PriceTable,
	PriceRow,
	PriceHeader,
	PriceData,
} from './HairdressingSalonsOverview.styles';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
  }
`;


interface Salon {
	id: string;
	name: string;
	image: string;
	description: string;
	priceList: string[];
}

const SalonOverview: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [salon, setSalon] = useState<Salon | null>(null);
	const [isReservationOpen, setIsReservationOpen] = useState(false);
	const reservationRef = useRef<HTMLDivElement>(null);

	const handleReservationClick = () => {
		setIsReservationOpen(true);
	};

	useEffect(() => {
		if (isReservationOpen) {
			setTimeout(() => {
				reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 0);
		}
	}, [isReservationOpen]);

	const handleReservationClose = () => {
		setIsReservationOpen(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const salonDoc = doc(db, 'salons', id);
				const salonData = await getDoc(salonDoc);

				if (salonData.exists()) {
					setSalon({
						id: salonData.id,
						name: salonData.data().name,
						image: salonData.data().image,
						description: salonData.data().description,
						priceList: salonData.data().priceList
					});
				}
			}
		};

		fetchData();
	}, [id]);

	if (!salon) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<GlobalStyles />
			<GlobalStyle />
			<Navbar />
			<HeroSection backgroundImage={salon.image}>
				<HeroOverlay />
				<HeroTitle>{salon.name}</HeroTitle>
			</HeroSection>
			<Container>
				<ContentSection>
					<SalonImage src={salon.image} alt={salon.name} />
					<SalonName>{salon.name}</SalonName>
					<SalonDescription>{salon.description}</SalonDescription>
					<SectionTitle>Price List</SectionTitle>
					<PriceTable>
						<thead>
							<PriceRow>
								<PriceHeader>Service</PriceHeader>
								<PriceHeader>Price</PriceHeader>
							</PriceRow>
						</thead>
						<tbody>
							{salon.priceList.map((price, idx) => {
								const [service, priceValue] = price.split(':'); 
								return (
									<PriceRow key={idx}>
										<PriceData>{service.trim()}</PriceData>
										<PriceData>{priceValue.trim()}</PriceData>
									</PriceRow>
								);
							})}
						</tbody>
					</PriceTable>
					<SectionTitle>Customer Reviews</SectionTitle>
					<Reviews>
						<Review>
							<ReviewAuthor>John Doe</ReviewAuthor>
							<ReviewText>Great service and friendly staff! Highly recommend this place.</ReviewText>
						</Review>
						<Review>
							<ReviewAuthor>Jane Smith</ReviewAuthor>
							<ReviewText>Love the atmosphere and the stylists are amazing. Will definitely visit again.</ReviewText>
						</Review>
					</Reviews>

					<SectionTitle>Location</SectionTitle>
					<SalonDescription>
						123 Main Street, Riga, Latvia
					</SalonDescription>

					<ReservationButton onClick={handleReservationClick}>Make a Reservation</ReservationButton>
					<div ref={reservationRef}>
						{isReservationOpen && id && <SalonReservation salonId={id} onClose={handleReservationClose} />}
					</div>
				</ContentSection>
			</Container>
		</>
	);
};

export default SalonOverview;
