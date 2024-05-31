import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import { db } from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; 
import {
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  Container,
  SalonGrid,
  SalonCard,
  SalonImage,
  SalonInfo,
  SalonName,
  SalonDescription,
  Button,
  HighlightList,
  HighlightItem,
  PriceList,
  PriceListItem,
  SearchBar,
  SearchBarContainer,
  SearchIcon,
  CloseIcon,
  FiltersContainer
} from './HairdressingSalons.styles';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f0f2f5;
    color: #333;
  }
`;

interface Salon {
  id: string;
  name: string;
  image: string;
  description: string;
  highlights: string[];
  priceList: string[];
}
type OptionType = { value: string; label: string; };

const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    width: 200, 
  }),
  option: (provided: any) => ({
    ...provided,
    color: 'black', 
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'black', 
  }),
};

const BestSalonsInCity: React.FC = () => {
  const [salonsData, setSalonsData] = useState<Salon[]>([]);
  const navigate = useNavigate();
  const [selectedSalon, setSelectedSalon] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const salonOptions = [
    { value: 'all', label: 'All' },
    ...salonsData.map(salon => ({ value: salon.id, label: salon.name })),
  ];
  const [sortOption, setSortOption] = useState('A-Z'); 

  useEffect(() => {
    const fetchData = async () => {
      const salonsCol = collection(db, 'salons');
      const salonSnapshot = await getDocs(salonsCol);
      const newSalons = salonSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        description: doc.data().description,
        highlights: doc.data().highlights || [],
        priceList: doc.data().priceList || [], 
      })) as Salon[];

      setSalonsData(newSalons);
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSelectChange = (selectedOption: any) => {
    setSelectedSalon(selectedOption);
  };
  const handleSortChange = (selectedOption: any) => {
    setSortOption(selectedOption.value);
  };

  const sortOptions = [
    { value: 'A-Z', label: 'Name (A-Z)' },
    { value: 'Z-A', label: 'Name (Z-A)' },
    // Add more options here if needed
  ];
  

  const goToSalon = (id: string) => {
    navigate(`/salons/${id}`);
  };

  return (
    <>
      <GlobalStyles />
      <GlobalStyle />
      <Navbar />
      <HeroSection>
        <HeroTitle>Top Hairdressing Salons in the City</HeroTitle>
        <HeroSubtitle>Discover the best hairdressing experiences in the city</HeroSubtitle>
        <SearchBarContainer>
          <SearchBar placeholder="Search products..." value={searchTerm} onChange={handleSearch} />
          {searchTerm ? <CloseIcon size={20} onClick={() => setSearchTerm('')} /> : <SearchIcon size={20} />}
        </SearchBarContainer>
        <FiltersContainer>
          <Select
            options={salonOptions}
            value={selectedSalon}
            onChange={handleSelectChange}
            styles={selectStyles} 
          />
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={handleSortChange}
            styles={selectStyles} 
          />
        </FiltersContainer>
      </HeroSection>
      <Container>
      <SalonGrid>
      {salonsData
          .filter(salon => {
            return salon.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
              (!selectedSalon || selectedSalon.value === 'all' || salon.id === selectedSalon.value);
          })
          .sort((a, b) => {
            switch (sortOption) {
              case 'A-Z':
                return a.name.localeCompare(b.name);
              case 'Z-A':
                return b.name.localeCompare(a.name);
              default:
                return 0;
            }
          })
          .map((salon, index) => (
              <SalonCard key={index}>
                <SalonImage src={salon.image} />
                <SalonInfo>
                  <SalonName>{salon.name}</SalonName>
                  <SalonDescription>{salon.description}</SalonDescription>
                  <HighlightList>
                    {salon.highlights.map((highlight, idx) => (
                      <HighlightItem key={idx}>{highlight}</HighlightItem>
                    ))}
                  </HighlightList>
                  <PriceList>
                    {salon.priceList.map((price, idx) => (
                      <PriceListItem key={idx}>{price}</PriceListItem>
                    ))}
                  </PriceList>
                  <Button onClick={() => goToSalon(salon.id)}>Learn More</Button>
                </SalonInfo>
              </SalonCard>
            ))}
        </SalonGrid>
      </Container>
    </>
  );
};

export default BestSalonsInCity;
