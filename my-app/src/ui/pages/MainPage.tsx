import React from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import Hero from '../organisms/Hero';
import Global from '../atoms/GlobalStyles';

const Container = styled.div`
`;

const MainPage: React.FC = () => {
  return (
    <Container>
      <Global />
      <Navbar />
      <Hero 
        title='Embrace the Spirit of Urban Adventure:'
        description='Where Every Step Beckons New Discoveries' 
        text='Dive into the vibrant rhythm of city life, where every street corner holds the promise of an exciting journey. Explore bustling neighborhoods, uncover hidden gems, and immerse yourself in the rich tapestry of urban culture. Whether it is wandering through historic districts, sampling local cuisine, or discovering unique attractions, every step you take brings new experiences and adventures. Let the city be your playground, and let curiosity be your guide as you embark on a thrilling urban exploration.' 
      />
    </Container>
  );
}

export default MainPage;
