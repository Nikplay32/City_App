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
  padding: 5rem 2rem;
  background: linear-gradient(to right, #000428, #004e92);
  color: #fff;
  border-top: 8px solid #FFD700;
  border-bottom: 8px solid #FFD700;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  animation: ${fadeIn} 1s ease-out;
`;

const HeadingText = styled.p`
  font-weight: 300;
  margin-bottom: 0;
  font-size: 1.5rem;
  color: #FFA500;
`;

const HeadingTitle = styled.h2`
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 3rem;
  background: linear-gradient(45deg, #FFD700, #FF4500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeadingSubtitle = styled.p`
  font-weight: 500;
  margin-bottom: 2rem;
  font-size: 1.25rem;
  color: #FFD700;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 20rem;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
  text-align: center;
  backdrop-filter: blur(10px);
  animation: ${bounce} 2s infinite ease-in-out;
  transition: transform 0.3s ease, border-color 0.3s ease;
  &:hover {
    transform: scale(1.05);
    border-color: #FF4500;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 1rem;
  }
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #FFD700, #FF4500);
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const StepTitle = styled.h3`
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #FFD700;
`;

const StepDescription = styled.p`
  color: #ecf0f1;
  font-weight: 400;
  margin-bottom: 0;
  font-size: 1rem;
`;

const HowItWorks: React.FC = () => {
  return (
    <Container>
      <HeadingContainer>
        <HeadingText>Steps</HeadingText>
        <HeadingTitle>How It Works</HeadingTitle>
        <HeadingSubtitle>
          Discover the simple steps to get started with our city app and make the most of your urban adventures.
        </HeadingSubtitle>
      </HeadingContainer>
      <StepContainer>
        <StepCard>
          <StepNumber>1</StepNumber>
          <StepTitle>Sign Up</StepTitle>
          <StepDescription>
            Create an account to access all the features and start your journey.
          </StepDescription>
        </StepCard>
        <StepCard>
          <StepNumber>2</StepNumber>
          <StepTitle>Explore</StepTitle>
          <StepDescription>
            Browse through various services and activities available in the city.
          </StepDescription>
        </StepCard>
        <StepCard>
          <StepNumber>3</StepNumber>
          <StepTitle>Enjoy</StepTitle>
          <StepDescription>
            Book and enjoy your selected services and activities effortlessly.
          </StepDescription>
        </StepCard>
      </StepContainer>
    </Container>
  );
};

export default HowItWorks;
