// components/HowItWorks/index.tsx

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 5rem 0;
  background-color: black;
`;

const HeadingContainer = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 4rem;
`;

const HeadingText = styled.p`
  color: #ffffff;
  font-weight: 300;
  margin-bottom: 0;
`;

const HeadingTitle = styled.h2`
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const HeadingSubtitle = styled.p`
  font-weight: 500;
  margin-bottom: 4rem;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 30rem;
  padding: 3rem 2rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 0 1rem;
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  margin-bottom: 2rem;
  background-color: #007bff;
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  border-radius: 50%;
`;

const StepTitle = styled.h3`
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: #6c757d;
  font-weight: 400;
  margin-bottom: 0;
`;

const HowItWorks: React.FC = () => {
  return (
    <Container>
      <HeadingContainer>
        <HeadingText>Steps</HeadingText>
        <HeadingTitle>How It Works</HeadingTitle>
        <HeadingSubtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tristique nec sapien vel bibendum. Phasellus sagittis nisl vitae auctor
          sodales.
        </HeadingSubtitle>
      </HeadingContainer>
      <StepContainer>
        <StepCard>
          <StepNumber>1</StepNumber>
          <StepTitle>Headline</StepTitle>
          <StepDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor.
          </StepDescription>
        </StepCard>
        <StepCard>
          <StepNumber>2</StepNumber>
          <StepTitle>Headline</StepTitle>
          <StepDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor.
          </StepDescription>
        </StepCard>
        <StepCard>
          <StepNumber>3</StepNumber>
          <StepTitle>Headline</StepTitle>
          <StepDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor.
          </StepDescription>
        </StepCard>
      </StepContainer>
    </Container>
  );
};

export default HowItWorks;