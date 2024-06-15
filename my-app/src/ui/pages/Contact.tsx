import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 

const ContactSection = styled.section`
  background-color: #f8f9fa;
  padding: 100px 0;
`;

const customIcon = L.icon({
  iconUrl: 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png',
  iconSize: [20, 30],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50], 
});


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MapContainerStyled = styled.div`
  flex: 1;
`;


const ContactSectionComponent: React.FC = () => {
  const RIGA_LATITUDE = 56.9496;
  const RIGA_LONGITUDE = 24.1052;

  return (
    <ContactSection>
      <Container>
        <Heading>Our Location</Heading>
        <h3>Visit us for additional help!</h3>
        <Row>
          <MapContainerStyled>
            <MapContainer center={[RIGA_LATITUDE, RIGA_LONGITUDE]} zoom={15} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
              <Marker position={[RIGA_LATITUDE, RIGA_LONGITUDE]} icon={customIcon}>
                <Popup>We are here!</Popup>
              </Marker>
            </MapContainer>
          </MapContainerStyled>
        </Row>
      </Container>
    </ContactSection>
  );
};

export default ContactSectionComponent;