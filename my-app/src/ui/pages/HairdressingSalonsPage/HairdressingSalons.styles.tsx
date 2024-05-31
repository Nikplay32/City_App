import styled from "styled-components";
import { FaSearch, FaTimes } from 'react-icons/fa';

export const HeroSection = styled.div`
  background: url('https://static.vecteezy.com/system/resources/previews/006/897/001/non_2x/professional-equipment-for-hairdressing-salon-hair-stylist-tools-horizontal-seamless-pattern-linear-icons-haircut-hair-coloring-golden-outline-on-a-black-background-for-printing-banners-vector.jpg') no-repeat center center/cover;
  color: #fff;
  padding: 150px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center; 
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.566); 
    z-index: 1;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
  z-index: 2;
  position: relative;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin: 20px 0 0;
  z-index: 2;
  position: relative;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: -50px auto 0;
  padding: 20px;
  position: relative;
  z-index: 2;
`;

export const SalonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  padding: 60px 0;
`;

export const SalonCard = styled.div`
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
`;

interface SalonImageProps {
  src: string;
}

export const SalonImage = styled.div<SalonImageProps>`
  width: 100%;
  height: 220px;
  background: url(${props => props.src}) center/cover no-repeat;
  transition: transform 0.3s ease;

  ${SalonCard}:hover & {
    transform: scale(1.1);
  }
`;

export const SalonInfo = styled.div`
  padding: 20px;
  position: relative;
  z-index: 2;
`;

export const SalonName = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
`;

export const SalonDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const Button = styled.button`
  display: inline-block;
  margin-top: 15px;
  padding: 12px 25px;
  background: linear-gradient(135deg, #ff6b6b, #ff4a4a);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff4a4a, #ff6b6b);
    transform: scale(1.05);
  }
`;

export const HighlightList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
`;

export const HighlightItem = styled.li`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;

  &:before {
    content: '•';
    margin-right: 5px;
    color: #ff6b6b;
  }
`;

export const PriceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #333;
`;

export const PriceListItem = styled.li`
  margin-bottom: 5px;
`;

export const SearchBarContainer = styled.div`
    position: relative;
    width: 300px;
    height: 40px;
    margin-bottom: 20px;
    z-index: 2;
`;

export const SearchBar = styled.input.attrs({ type: 'search' })`
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-right: 40px;
    border: none;
    margin-top: 20px;
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
    top: 100%;
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

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 2;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;