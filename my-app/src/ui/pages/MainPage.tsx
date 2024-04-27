import React from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import Hero from '../organisms/Hero';
import Global from '../atoms/GlobalStyles';
import AboutUs from '../organisms/AboutUs';
import HowItWorks from '../organisms/HowSection';
import Faq from '../organisms/FAQ';
import Footer from '../organisms/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1 0 auto;
`;

const MainPage: React.FC = () => {
  return (
    <Container>
      <Global />
      <Navbar />
      <Content>
        <Hero 
          title='Embrace the Spirit of Urban Adventure:'
          description='Where Every Step Beckons New Discoveries' 
          text='Dive into the vibrant rhythm of city life, where every street corner holds the promise of an exciting journey. Explore bustling neighborhoods, uncover hidden gems, and immerse yourself in the rich tapestry of urban culture. Whether it is wandering through historic districts, sampling local cuisine, or discovering unique attractions, every step you take brings new experiences and adventures. Let the city be your playground, and let curiosity be your guide as you embark on a thrilling urban exploration.' 
        />
        <AboutUs/>
        <HowItWorks/>
        <Faq></Faq>
      </Content>
      <Footer />
    </Container>
  );
}

export default MainPage;