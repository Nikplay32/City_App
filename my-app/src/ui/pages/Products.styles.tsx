import styled from "styled-components";
import { FaSearch, FaTimes } from 'react-icons/fa';
import { keyframes } from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  padding-bottom: 30px;
`;

export const PageButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;
`;

export const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    background-color: white;
`;

export const movingGradient = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const HeroSection = styled.div`
  color: #ffffff;
  padding: 50px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid #000;
  background: repeating-linear-gradient(45deg, black, #683af4 100px);
  background-size: 200% 200%;
  animation: ${movingGradient} 15s linear infinite;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: auto;

  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
  }
`;

export const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  border-radius: 15px;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

export const GoToProductButton = styled.button`
  padding: 10px 20px;
  background-color: #ffc107;
  border-radius: 15px;
  color: black;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff9800;
  }
`;

export const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: 56px;
    font-weight: 800;
    color: #ffffff;
`;

export const Specification = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SpecificationItem = styled.div`
    display: flex;
    margin: 5px 10px;
    padding: 5px;
    background-color: #000000;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    align-items: center;
`;

export const SearchBarContainer = styled.div`
    position: relative;
    width: 300px;
    height: 40px;
    margin-bottom: 20px;
`;

export const SearchBar = styled.input.attrs({ type: 'search' })`
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-right: 40px; /* Make room for the search icon */
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
        color: #aaa;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none;
    }
`;

export const SearchIcon = styled(FaSearch)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9c9c9c;
`;

export const CloseIcon = styled(FaTimes)`
    position: absolute;
    right: 10px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    color: #9c9c9c;
`;

export const NotFoundMessage = styled.div`
  width: 100%;
  text-align: center;
  padding: 50px 0;
  font-size: 1.2em;
  color: #666;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;

`;

export const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 4px solid #2684ff;
  width: 300px;
  padding: 10px;
  margin: 10px;
  background: #fff;
  color: #333;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    ${Overlay} {
      display: flex;
      opacity: 1;
    }
  }
`;

export const TextTitle = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  padding: 10px;
  color: #333;
  font-weight: 700;
`;

export const Description = styled.p`
  color: #666;
  padding: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const InfoButton = styled.button`
  padding: 10px 20px;
  background-color: #2684ff;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export const Price = styled.p`
  font-size: 1rem;
  padding: 10px;
  color: #333;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #2684ff;
  border-radius: 15px;
  color: black;
  border: none;
  cursor: pointer;
`;

export const Image = styled.img`
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

export const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 1rem;
  z-index: 3;
  @media (max-width: 768px){
    flex-direction: column;
  }
`;

export const SubscriptionRibbon = styled.div`
  position: absolute;
  top: 0;
  right: -70px;
  padding: 5px 10px;
  background-color: #f00;
  color: #fff;
  font-weight: bold;
  z-index: 2;
  transform: rotate(45deg);
  transform-origin: 40% 0;
`;