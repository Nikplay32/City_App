import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import {
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  Container,
  SightGrid,
  SightCard,
  SightImage,
  SightInfo,
  SightName,
  SightDescription,
  SightLocation,
  SightOpeningHours,
  SightAdmission
} from './Sights.styles';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
  }
`;

interface Sight {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  openingHours: string;
  admission: string;
}

const SightsPage: React.FC = () => {
  const [sightsData, setSightsData] = useState<Sight[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const sightsCol = collection(db, 'sights');
      const sightSnapshot = await getDocs(sightsCol);
      const newSights = sightSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        description: doc.data().description,
        location: doc.data().location,
        openingHours: doc.data().openingHours,
        admission: doc.data().admission,
      })) as Sight[];

      setSightsData(newSights);
    };

    fetchData();
  }, []);

  const goToSight = (id: string) => {
    navigate(`/sight/${id}`);
  };

  return (
    <>
      <GlobalStyles />
      <GlobalStyle />
      <Navbar />
      <HeroSection>
        <HeroTitle>Discover the Best Sights in Riga</HeroTitle>
        <HeroSubtitle>Explore the iconic landmarks and attractions</HeroSubtitle>
      </HeroSection>
      <Container>
        <SightGrid>
          {sightsData.map((sight, index) => (
            <SightCard key={index} onClick={() => goToSight(sight.id)}>
              <SightImage src={sight.image} />
              <SightInfo>
                <SightName>{sight.name}</SightName>
                <SightDescription>{sight.description}</SightDescription>
                <SightLocation><strong>Location:</strong> {sight.location}</SightLocation>
                <SightOpeningHours><strong>Opening Hours:</strong> {sight.openingHours}</SightOpeningHours>
                <SightAdmission><strong>Admission:</strong> {sight.admission}</SightAdmission>
              </SightInfo>
            </SightCard>
          ))}
        </SightGrid>
      </Container>
    </>
  );
};

export default SightsPage;
