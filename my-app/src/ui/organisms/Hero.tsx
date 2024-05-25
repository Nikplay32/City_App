import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../atoms/Button';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  padding: 100px 20px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  animation: ${slideIn} 1s ease-out;
  z-index: 2;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  animation: ${fadeIn} 2s ease forwards;

  @media (max-width: 768px) {
    font-size: 48px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const Description = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 2rem;
  animation: ${fadeIn} 2.5s ease forwards;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 2rem;
  animation: ${fadeIn} 3s ease forwards;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;
  opacity: 0.3;
  z-index: 1;
`;

const HeroButton = styled(Button)`
  background-color: #ff8c00;
  color: #ffffff;
  font-size: 20px;
  padding: 15px 30px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6500;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

interface HeroProps {
  title: string;
  description: string;
  text: string;
}

function Hero({ title, description, text }: HeroProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (currentUser.user) {
      navigate('/profile');
    } else {
      navigate('/authorization');
    }
  };
  return (
    <HeroContainer>
      <BackgroundImage />
      <ContentWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Text>{text}</Text>
        <HeroButton onClick={handleButtonClick}>
          Get Started
        </HeroButton>
      </ContentWrapper>
    </HeroContainer>
  );
}

export default Hero;
