import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';

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
  background: linear-gradient(135deg, #4ecdc4, #43a286);
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
  margin: 0 auto;
  padding: 20px;
`;

const SightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

const SightCard = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
`;

const SightImage = styled.img`
  width: 100%;
  min-width: 200px; /* Adjust as needed */
  min-height: 150px; /* Adjust as needed */
  object-fit: cover;
`;

const SightInfo = styled.div`
  padding: 20px;
`;

const SightName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

const SightDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const SightLocation = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
`;

const SightOpeningHours = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
`;

const SightAdmission = styled.p`
  font-size: 0.9rem;
  color: #777;
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
