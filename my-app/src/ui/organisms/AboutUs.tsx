import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  color: #333;
  border-top: 5px solid #3498db;
  border-bottom: 5px solid #3498db;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 4rem 1rem;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  order: 1;
  padding: 0 20px;
  margin-right: 4rem;
  box-sizing: border-box;
  animation: ${fadeIn} 1s ease-out;
  border-left: 5px solid #3498db;
  padding-left: 20px;
  @media (max-width: 768px) {
    margin-right: 0;
    padding: 0 10px;
    text-align: center;
    border-left: none;
    border-top: 5px solid #3498db;
    padding-top: 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  order: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  animation: ${fadeIn} 1.5s ease-out;
  @media (max-width: 768px) {
    margin-top: 2rem;
    justify-content: center;
  }
`;

const ImageItem = styled.div`
  flex-basis: calc(50% - 10px);
  margin-bottom: 20px;
  animation: ${fadeIn} 2s ease-out;
  &:nth-child(even) {
    margin-left: 20px;
  }
  @media (max-width: 768px) {
    flex-basis: calc(50% - 5px);
    margin-left: 0;
    &:nth-child(even) {
      margin-left: 0;
    }
  }
  @media (max-width: 480px) {
    flex-basis: 100%;
    margin-left: 0;
  }
`;

const StyledImg = styled.img`
  border-radius: 12px;
  width: 100%;
  height: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #7f8c8d;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 1.25rem;
    text-align: center;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #34495e;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 0.875rem;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  text-align: left;
  margin-top: 1rem;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
  }
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const AboutUs: React.FC = () => {
  const imageUrls = [
    'https://media.istockphoto.com/id/889402258/photo/these-seats-need-to-be-filled.jpg?s=612x612&w=0&k=20&c=4zBhSi2Ar7hpQqsZHUsA9uRmIHJK2qmOE__M7LjfGP8=',
    'https://tourscanner.com/blog/wp-content/uploads/2023/03/things-to-do-in-Riga-Latvia.jpg',
    'https://www.2foodtrippers.com/wp-content/uploads/2018/02/Kolonade-Dining-Room-Riga-Restaurants.jpg.webp',
    'https://time.com/personal-finance/static/968cd62628d70e99030c6d7ec55b404f/57e17/rent-a-car.jpg',
  ];

  return (
    <Container>
      <TextContainer>
        <Heading>About Us</Heading>
        <SubHeading>Discover Our Story</SubHeading>
        <Paragraph>
          Welcome to our city app, where we bring the spirit of urban adventure
          to your fingertips. Our mission is to provide a seamless and
          enriching experience for city explorers, whether you're looking to
          navigate public transport, rent cars, or find tickets for the latest
          events.
        </Paragraph>
        <Paragraph>
          Our dedicated team works tirelessly to ensure you have access to the
          best resources and information, making your city experience as smooth
          and enjoyable as possible. Join us on this journey and embrace the
          vibrant rhythm of city life.
        </Paragraph>
      </TextContainer>
      <ImageContainer>
        {imageUrls.map((src, index) => (
          <ImageItem key={index}>
            <StyledImg src={src} alt={`Gallery image ${index + 1}`} />
          </ImageItem>
        ))}
      </ImageContainer>
    </Container>
  );
};

export default AboutUs;
