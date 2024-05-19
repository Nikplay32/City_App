import React from 'react';
import styled from 'styled-components';
import { IoMdCloseCircleOutline } from 'react-icons/io'; // Use close icon for failure
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
  color: #f44336; /* Red color for failure */
  margin-bottom: 16px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #333333;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled(Link)`
  background-color: #f44336; /* Red color for failure */
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    font-size: 48px;
    color: red;
    margin-right: 10px;
  }
`;

const PaymentFailure: React.FC = () => {
  return (
    <>
    <GlobalStyles></GlobalStyles>
    <Container>
      <Card>
        <IconContainer>
          <IoMdCloseCircleOutline /> {/* Close icon for failure */}
        </IconContainer>
        <Title>Payment Failed</Title> {/* Message updated for failure */}
        <Message>
          We're sorry, but your payment was not successful. Please try again or contact support for assistance.
        </Message>
        <ButtonContainer>
        <Button to="/payment">Try Again</Button>
        <Button to="/profile">To profile</Button>
        </ButtonContainer> {/* Link to payment page for retry */}
      </Card>
    </Container>
    </>
  );
};

export default PaymentFailure;
