import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import Hero from '../organisms/Hero';
import Global from '../atoms/GlobalStyles';
import AboutUs from '../organisms/AboutUs';
import HowItWorks from '../organisms/HowSection';
import Faq from '../organisms/FAQ';
import Footer from '../organisms/Footer';
import ContactSection from './Contact';

const faqData = [
  {
    question: 'What benefits do I get with a Pro subscription?',
    answer: 'With a Pro subscription, you get access to premium cars, priority customer support, the ability to earn loyalty points, and exclusive discounts. The yearly subscription offers additional benefits such as 2 months free and access to exclusive yearly member events.'
  },
  {
    question: 'How do loyalty points work?',
    answer: 'Loyalty points are earned on every rental. These points can be redeemed for discounts on future rentals or other exclusive benefits. The more you rent, the more points you accumulate.'
  },
  {
    question: 'Can I switch between monthly and yearly plans?',
    answer: 'Yes, you can switch between monthly and yearly plans at any time. The changes will take effect at the end of your current billing period.'
  },
  {
    question: 'What cars are available for rent?',
    answer: 'With a Free subscription, you can rent economy and standard cars. Pro subscribers can rent premium cars, including luxury and high-performance vehicles.'
  },
  {
    question: 'What happens if I need to cancel my subscription?',
    answer: 'You can cancel your subscription at any time. If you cancel, you will retain access to your current subscription benefits until the end of the billing period. No refunds will be provided for the remaining period.'
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1 0 auto;
`;

const MainPage: React.FC = () => {
  let lastScrollPosition = 0;

useEffect(() => {
  window.addEventListener('scroll', function() {
    var car = document.getElementById('car');
    if (car) {  // Check if the car element exists
      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // Check if we're scrolling down or up
      if (scrollPosition > lastScrollPosition) {
        // Scrolling down
        car.style.transform = 'translateY(' + (scrollPosition * 0.2) + 'px)';
      } else {
        // Scrolling up
        car.style.transform = 'translateY(' + (scrollPosition * 0.2) + 'px) rotate(180deg)';
      }

      // Check if the scroll position is at the end of the page
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        // If it is, rotate the car 180 degrees
        car.style.transform = 'translateY(' + (scrollPosition * 0.2) + 'px) rotate(180deg)';
      }

      // Update the last scroll position
      lastScrollPosition = scrollPosition;
    }
  });
}, []);

  return (
    <>
      <Global />
      <Container>
        <Navbar />
        <Content>
          <Hero 
            title='Embrace the Spirit of Urban Adventure:'
            description='Where Every Step Beckons New Discoveries' 
            text='Dive into the vibrant rhythm of city life, where every street corner holds the promise of an exciting journey. Explore bustling neighborhoods, uncover hidden gems, and immerse yourself in the rich tapestry of urban culture. Whether it is wandering through historic districts, sampling local cuisine, or discovering unique attractions, every step you take brings new experiences and adventures. Let the city be your playground, and let curiosity be your guide as you embark on a thrilling urban exploration.' 
          />
          <AboutUs/>
          <HowItWorks/>
          <Faq
            headingText="F.A.Q"
            headingTitle="Frequently Asked Questions"
            headingSubtitle="Here are some of the most common questions our customers ask about our subscription plans."
            faqs={faqData}
          />
        </Content>
        <ContactSection></ContactSection>
        <Footer />
      </Container>
      <div id="car"></div>
      <div id="road"></div>
    </>
  );
}

export default MainPage;