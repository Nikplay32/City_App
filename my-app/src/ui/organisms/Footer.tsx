import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const waveAnimation = keyframes`
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
`;

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 40px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    height: 20px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background: linear-gradient(to right, #4b4b4b, #282c34, #4b4b4b);
    animation: ${waveAnimation} 2s infinite;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  flex: 1;
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #ccc;
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 24px;
  transition: transform 0.3s ease;

  &:hover {
    animation: ${pulseAnimation} 1s infinite;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Content>
        <Row>
          <Column>
            <FooterText>About Us</FooterText>
            <FooterText>Our Story</FooterText>
            <FooterText>Careers</FooterText>
          </Column>
          <Column>
            <FooterText>Support</FooterText>
            <FooterText>Contact Us</FooterText>
            <FooterText>FAQs</FooterText>
          </Column>
          <Column>
            <FooterText>Legal</FooterText>
            <FooterText>Privacy Policy</FooterText>
            <FooterText>Terms of Service</FooterText>
          </Column>
          <Column>
            <FooterText>Follow Us</FooterText>
            <Socials>
              <SocialLink href="#">
                <FaFacebookF />
              </SocialLink>
              <SocialLink href="#">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#">
                <FaInstagram />
              </SocialLink>
            </Socials>
          </Column>
        </Row>
        <FooterText>© 2024 Your Company Name. All rights reserved.</FooterText>
      </Content>
    </FooterContainer>
  );
}

export default Footer;
