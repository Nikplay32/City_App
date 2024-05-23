import styled from "styled-components";
import { keyframes } from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    background-color: #ffffff;
`;

export const movingGradient = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 1rem;
`;

export const HeroSection = styled.div`
  color: #ffffff;
  padding: 50px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 1px solid #000;
  background: repeating-linear-gradient(45deg, black, #00ff2a 100px);
  background-size: 200% 200%;
  animation: ${movingGradient} 15s linear infinite;
`;

export const HeroImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;

  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
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
    margin-top: 30px;
`;

export const Title = styled.h1`
    font-size: 56px;
    font-weight: 800;
    color: #ffffff;
`;

export const NotFoundMessage = styled.h2`
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    margin-top: 50px;
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

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  margin: 10px;
  background-color: white;
  color: black;
  position: relative;
  border: 10px solid transparent;
  border-radius: 20px;
`;

export const TextTitle = styled.h2`
  font-size: 20px;
  text-align: left;
  padding: 0px 50px 10px 10px;
  color: #2c6602;
`;

export const StyledDate = styled.h4`
  font-size: 15px;
  text-align: left;
  padding: 10px;
  color: black;
`;

export const InfoButton = styled.button`
  margin: 0px 0px 10px 10px;
  background-color: #e0f1f1;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
`;

export const Price = styled.p`
  font-size: 18px;
  padding: 10px;
  color: black;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: white;
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


interface Activity {
  id: string;
  title: string;
  images: string[];
  date: string;
  shortDescription: string;
  description: string;
  category: string;
}