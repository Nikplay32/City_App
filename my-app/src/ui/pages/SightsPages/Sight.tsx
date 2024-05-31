import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import {
  Container,
  SightInfo,
  SightImage,
  SightTitle,
  SightDescription,
  DetailSection,
  DetailTitle,
  DetailText
} from './SightsPage.styles';

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
