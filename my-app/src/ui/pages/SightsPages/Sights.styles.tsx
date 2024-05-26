import styled from "styled-components";

export const HeroSection = styled.div`
  background: linear-gradient(135deg, #4ecdc4, #43a286);
  color: #fff;
  padding: 150px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  z-index: 2;
  position: relative;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 20px 0 0;
  z-index: 2;
  position: relative;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const SightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 20px 0;
`;

export const SightCard = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
`;

export const SightImage = styled.img`
  width: 100%;
  min-width: 200px; /* Adjust as needed */
  min-height: 150px; /* Adjust as needed */
  object-fit: cover;
`;

export const SightInfo = styled.div`
  padding: 20px;
`;

export const SightName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

export const SightDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

export const SightLocation = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
`;

export const SightOpeningHours = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
`;

export const SightAdmission = styled.p`
  font-size: 0.9rem;
  color: #777;
`;