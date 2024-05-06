import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';

const Container = styled.div`
  background-color: #24141c;
  color: #cccccc;
  font-family: 'Nunito', sans-serif;
  width: 70%;
  border-radius: 7px;
  padding: 5%;
  margin: 5% auto;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const FlexContent = styled.div`
  padding: 5% 10%;
  flex: 1;
`;

const BasicFlexContent = styled(FlexContent)`
  border-right: 0.1px solid rgba(178, 170, 171, 0.185);
`;

const ProFlexContent = styled(FlexContent)`
  border-right: none;
`;

const H2 = styled.h2`
  font-weight: 600;
`;

const H4 = styled.h4`
  font-weight: 400;
  margin: 0;
`;

const Span = styled.span`
  font-weight: 200;
`;

const Ul = styled.ul`
  padding-inline-start: 7%;
  margin: 20% 0;
`;

const Li = styled.li`
  font-weight: 200;
`;

const BasicButton = styled.button`
  outline: none;
  border: 1px solid #aa2b33;
  background: transparent;
  color: #aa2b33;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;

  &:hover {
    background: #aa2b33;
    color: white;
  }
`;

const ProButton = styled.button`
  outline: none;
  border: none;
  background: #aa2b33;
  color: white;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-family: 'Nunito', sans-serif;
  cursor: pointer;

  &:hover {
    background: white;
    color: #aa2b33;
  }
`;

const PricingTable = () => {
  const navigate = useNavigate();
  return (
    <>
    <GlobalStyles/>
    <Navbar/>
    <Container>
      <Flex>
        <BasicFlexContent>
          <H2>Basic</H2>
          <H4>Free</H4>
          <Span>3,000 monthly visitors</Span>
          <Ul>
            <Li>Limited Reports</Li>
            <Li>Unlimited projects</Li>
            <Li>Data storage for 1 year</Li>
          </Ul>
          <BasicButton onClick={() => navigate('/profile')}>
            Stay on Basic
          </BasicButton>
        </BasicFlexContent>
        <ProFlexContent>
          <H2>Pro</H2>
          <H4>$19 / month</H4>
          <Span>10,000 monthly visitors</Span>
          <Ul>
            <Li>Unlimited Reports</Li>
            <Li>15-days free trial</Li>
            <Li>Data storage for 3 year</Li>
          </Ul>
          <ProButton onClick={() => navigate('/payment')}>
            Try it
          </ProButton>
        </ProFlexContent>
      </Flex>
    </Container>
    </>
  );
};

export default PricingTable;