import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;
`;

const SightInfo = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
`;

const SightImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const SightTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const SightDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const DetailSection = styled.div`
  margin-top: 30px;
`;

const DetailTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const DetailText = styled.p`
  font-size: 1.2rem;
  color: #555;
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

const SightOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sight, setSight] = useState<Sight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const sightDoc = doc(db, 'sights', id);
        const sightData = await getDoc(sightDoc);

        if (sightData.exists()) {
          setSight({
            id: sightData.id,
            name: sightData.data().name,
            image: sightData.data().image,
            description: sightData.data().description,
            location: sightData.data().location,
            openingHours: sightData.data().openingHours,
            admission: sightData.data().admission,
          });
        }
      }
    };

    fetchData();
  }, [id]);

  if (!sight) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Container>
        <SightInfo>
          <SightImage src={sight.image} alt={sight.name} />
          <SightTitle>{sight.name}</SightTitle>
          <SightDescription>{sight.description}</SightDescription>
          <DetailSection>
            <DetailTitle>Location</DetailTitle>
            <DetailText>{sight.location}</DetailText>
          </DetailSection>
          <DetailSection>
            <DetailTitle>Opening Hours</DetailTitle>
            <DetailText>{sight.openingHours}</DetailText>
          </DetailSection>
          <DetailSection>
            <DetailTitle>Admission</DetailTitle>
            <DetailText>{sight.admission}</DetailText>
          </DetailSection>
        </SightInfo>
      </Container>
    </>
  );
};

export default SightOverview;
