import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;
`;

export const SightInfo = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
`;

export const SightImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const SightTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

export const SightDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

export const DetailSection = styled.div`
  margin-top: 30px;
`;

export const DetailTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

export const DetailText = styled.p`
  font-size: 1.2rem;
  color: #555;
`;