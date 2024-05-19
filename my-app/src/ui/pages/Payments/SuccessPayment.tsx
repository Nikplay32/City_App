import React from 'react';
import styled from 'styled-components';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaCar, FaGift } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // assuming you're using react-router for navigation
import GlobalStyles from '../../atoms/GlobalStyles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  text-align: center;
  background-image: url('/riga.jpg');
  background-size: cover;
  background-repeat: no-repeat;   
`;

const Card = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #333333;
  margin-bottom: 24px;
`;

const Button = styled(Link)`
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    font-size: 48px;
    margin-right: 10px;
  }
`;

const PaymentSuccess: React.FC = () => {
  return (
    <>
    <GlobalStyles></GlobalStyles>
    <Container>
      <Card>
        <IconContainer>
          <IoMdCheckmarkCircleOutline />
          <FaCar />
          <FaGift />
        </IconContainer>
        <Title>Payment Successful!</Title>
        <Message>
          Congratulations! Your payment was successful. You now have access to our premium car rental service.
          Earn loyalty bonus points with each interaction in our system!
        </Message>
        <Button to="/profile">Go to Profile</Button>
      </Card>
    </Container>
    </>
  );
};

export default PaymentSuccess;
