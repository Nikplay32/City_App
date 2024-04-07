import React from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import Global from '../atoms/GlobalStyles';

const Container = styled.div`
`;

const MainPage: React.FC = () => {
  return (
    <Container>
      <Global />
      <Navbar />
    </Container>
  );
}

export default MainPage;
