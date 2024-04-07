import React from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
`;

const MainPage: React.FC = () => {
  return (
    <Container>
      <Navbar />
    </Container>
  );
}

export default MainPage;
