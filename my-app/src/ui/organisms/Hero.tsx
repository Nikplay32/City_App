import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../atoms/Button';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 50px 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rem;
`;

const Title = styled.div`
  color: white;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 0.2rem; 
`;

const Description = styled.div`
  color: white;
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const Icon = styled.img`
  max-width: 24rem;
  height: auto;
`;

const TextContainer = styled.div`
  max-width: 800px;
`;

const Text = styled.div`
  color: white;
  font-weight: 200;
  margin-bottom: 2rem; 
`;

interface HeroProps {
  title: string;
  description: string;
  text: string;
}

function Hero({ title, description, text }: HeroProps) {
  return (
    <HeroContainer>
      <ContentWrapper>
        <Icon src={`${process.env.PUBLIC_URL}/city.jpg`} alt="Location Icon" />
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Text>{text}</Text>
          <Button>Get Started!</Button>
        </TextContainer>
      </ContentWrapper>
    </HeroContainer>
  );
}

export default Hero;
