import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  color: white;
  padding: 20px;
  flex-shrink: 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  flex-direction: column;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
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
            <SocialLink href="#">Facebook</SocialLink>
            <SocialLink href="#">Twitter</SocialLink>
            <SocialLink href="#">Instagram</SocialLink>
          </Socials>
        </Column>
      </Row>
      <FooterText>© 2022 Your Company Name</FooterText>
    </FooterContainer>
  );
}

export default Footer;