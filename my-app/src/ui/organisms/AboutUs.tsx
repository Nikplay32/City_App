// components/AboutUs/index.tsx

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
`;

const TextContainer = styled.div`
  flex: 1;
  order: 1;
  padding: 0 20px;
  margin-right: 4rem;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  flex: 1;
  order: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageItem = styled.div`
  flex-basis: calc(50% - 10px);
  margin-bottom: 20px;

  &:nth-child(even) {
    margin-left: 20px;
  }
`;

const StyledImg = styled.img`
  border-radius: 6px;
  width: 100%;
  height: auto;
`;

const AboutUs: React.FC = () => {
  const imageUrls = [
    'https://image.freepik.com/free-vector/abstract-geometric-background_1035-2477.jpg',
    'https://image.freepik.com/free-vector/abstract-geometric-background_1035-2478.jpg',
    'https://image.freepik.com/free-vector/abstract-geometric-background_1035-2479.jpg',
    'https://image.freepik.com/free-vector/abstract-geometric-background_1035-2480.jpg',
  ];

  return (
    <Container>
      <TextContainer>
        <h2 className="display-5 fw-bold">About Us</h2>
        <hr></hr>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="lead">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </TextContainer>
      <ImageContainer>
        {imageUrls.map((src, index) => (
          <ImageItem key={index}>
            <StyledImg src={src} alt="" />
          </ImageItem>
        ))}
      </ImageContainer>
    </Container>
  );
};

export default AboutUs;