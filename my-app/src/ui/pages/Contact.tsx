import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ContactSection = styled.section`
  background-color: #f8f9fa;
  padding: 100px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 60px;
  font-size: 2.5em;
  color: #333;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const MapContainerStyled = styled.div`
  flex: 1;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: ${fadeIn} 2s ease-in-out;

  .form-group {
    margin-bottom: 20px;
  }

  input, textarea {
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 16px;
    width: 100%;
    transition: border-color 0.3s ease;
    &:focus {
      border-color: #007bff;
    }
  }

  textarea {
    resize: vertical;
  }

  button {
    padding: 15px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ContactSectionComponent: React.FC = () => {
  const RIGA_LATITUDE = 56.9496;
  const RIGA_LONGITUDE = 24.1052;

  return (
    <ContactSection>
      <Container>
        <Heading>Contact Us</Heading>
        <Row>
          <FormContainer>
            <ContactForm>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea rows={5} placeholder="Your Message" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </ContactForm>
          </FormContainer>
          <MapContainerStyled>
            <MapContainer center={[RIGA_LATITUDE, RIGA_LONGITUDE]} zoom={15} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
              <Marker position={[RIGA_LATITUDE, RIGA_LONGITUDE]}>
                <Popup>Your Location</Popup>
              </Marker>
            </MapContainer>
          </MapContainerStyled>
        </Row>
      </Container>
    </ContactSection>
  );
};

export default ContactSectionComponent;