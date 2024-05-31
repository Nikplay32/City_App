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

const Section = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  text-align: center;
  color: #fff;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 3em;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const Subtitle = styled.p`
  font-size: 1.5em;
  margin-bottom: 60px;
  color: #cfd9df;
  position: relative;
  z-index: 2;
`;

const ShapesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  position: relative;
  z-index: 2;
`;

const Shape = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 15px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ShapeTitle = styled.h3`
  font-size: 1.8em;
  margin-bottom: 10px;
`;

const ShapeContent = styled.p`
  font-size: 1.2em;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  svg {
    position: absolute;
    fill: rgba(255, 255, 255, 0.1);
    &:nth-child(1) {
      top: 10%;
      left: 20%;
      width: 150px;
      height: 150px;
      animation: move1 20s linear infinite;
    }
    &:nth-child(2) {
      top: 60%;
      left: 70%;
      width: 100px;
      height: 100px;
      animation: move2 15s linear infinite;
    }
    &:nth-child(3) {
      top: 30%;
      left: 50%;
      width: 200px;
      height: 200px;
      animation: move3 25s linear infinite;
    }
  }
  @keyframes move1 {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
    100% {
      transform: translateY(0) rotate(360deg);
    }
  }
  @keyframes move2 {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
    }
    100% {
      transform: translateY(0) rotate(360deg);
    }
  }
  @keyframes move3 {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-30px) rotate(180deg);
    }
    100% {
      transform: translateY(0) rotate(360deg);
    }
  }
`;

const CityOptions: React.FC = () => {
  return (
    <Section>
      <Title>Explore Your City with Us</Title>
      <Subtitle>Discover unique agents, best options in the city, and the cheapest ways to explore</Subtitle>
      <ShapesContainer>
        <Shape>
          <ShapeTitle>Chat with Our Agents</ShapeTitle>
          <ShapeContent>
            Connect with our unique agents who are ready to assist you 24/7. They can help you find the best deals, give you insider tips, and ensure you have the best city experience.
          </ShapeContent>
        </Shape>
        <Shape>
          <ShapeTitle>Best City Options</ShapeTitle>
          <ShapeContent>
            We provide a curated list of the best options in the city, from dining and shopping to sightseeing and entertainment. Let us guide you to the top spots.
          </ShapeContent>
        </Shape>
        <Shape>
          <ShapeTitle>Cheapest Ways to Explore</ShapeTitle>
          <ShapeContent>
            Discover the most affordable ways to explore the city. From budget-friendly transportation to free events and attractions, we've got you covered.
          </ShapeContent>
        </Shape>
        <Shape>
          <ShapeTitle>Exclusive Deals</ShapeTitle>
          <ShapeContent>
            As a member, you get access to exclusive deals and discounts on various city activities and services. Save more while enjoying more.
          </ShapeContent>
        </Shape>
      </ShapesContainer>
      <BackgroundShapes>
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" /></svg>
        <svg viewBox="0 0 100 100"><rect x="0" y="0" width="100" height="100" /></svg>
        <svg viewBox="0 0 100 100"><polygon points="50,0 0,100 100,100" /></svg>
      </BackgroundShapes>
    </Section>
  );
}

export default CityOptions;
