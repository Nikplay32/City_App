import styled from 'styled-components';

export const PageContainer = styled.div`
  background: seashell;
  min-height: 100vh;
`;

export const Container = styled.div`
  background-color: #24141c;
  color: #cccccc;
  font-family: 'Nunito', sans-serif;
  width: 80%;
  border-radius: 10px;
  padding: 4%;
  margin: 5% auto 0;
  background-image: url('/riga.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const FlexContent = styled.div`
  padding: 5% 5%;
  flex: 1;
  background: rgba(36, 20, 28, 0.85);
  border-radius: 10px;
  margin: 10px;
  color: #fff;
`;

export const H2 = styled.h2`
  font-weight: 600;
  margin-bottom: 10px;
`;

export const H4 = styled.h4`
  font-weight: 400;
  margin: 5px 0 20px;
`;

export const Span = styled.span`
  font-weight: 200;
  display: block;
  margin-bottom: 20px;
`;

export const Ul = styled.ul`
  padding-inline-start: 7%;
  margin: 20% 0;
  list-style: none;
`;

export const Li = styled.li`
  font-weight: 200;
  margin-bottom: 10px;
  &:before {
    content: "✓";
    color: #0cdd32;
    margin-right: 10px;
  }
`;
export const DividerContainer = styled.div`

`;

export const Divider = styled.div`
  margin: 5% auto;
  width: 100%;
  text-align: center;
  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 2px;
    background-color: #0cdd32;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }

  span {
    display: inline-block;
    padding: 0 10px;
    color: #0cdd32;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;