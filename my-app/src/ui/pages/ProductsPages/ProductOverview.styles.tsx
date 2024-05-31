import Select from 'react-select';
import styled from 'styled-components';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const OptionSelect = styled(Select)`
  width: 100%;
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    max-height: 300px; 
  }
`;

export const ImageTitle = styled.h2`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const Image = styled.img`
  width: 75vw; 
  height: 100vh; 
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100vw;
    height: 300px; 
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #0056b3;
  }
`;

export const PrevButton = styled(ArrowButton)`
  left: 10px;
`;

export const NextButton = styled(ArrowButton)`
  right: 10px;
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Price = styled.h2`
  color: #007bff;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const AddToCartButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #0056b3;
  }
`;

export const TechData = styled.div`
  width: 100%;
  border-top: 1px solid #e3e3e3;
  margin-top: 20px;
  padding: 20px; // added
  background-color: #f9f9f9;
`;

export const TechDataTitle = styled.h2`
  color: #333;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const TechDataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TechDataRow = styled.tr`
  border-bottom: 1px solid #e3e3e3;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TechDataCell = styled.td`
  padding: 15px 0;
  padding-left: 10px;
`;

export const TechDataHeader = styled.th`
  color: #333;
  font-weight: bold;
  padding: 15px 0;
  padding-left: 10px;
`;

export const BookingOption = styled.div`
  width: 100%;
  border-top: 1px solid #e3e3e3;
  margin-top: 20px;
  padding-top: 20px;
`;

export const BookingOptionTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const BookingOptionDescription = styled.p`
  color: #666;
  font-size: 16px;
`;

export const PriceDetails = styled.div`
  width: 100%;
  border-top: 1px solid #e3e3e3;
  margin-top: 20px;
  padding-top: 20px;
`;

export const PriceDetailsTitle = styled.h3`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const PriceDetailsDescription = styled.p`
  color: #666;
  font-size: 16px;
`;