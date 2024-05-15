import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import Footer from '../organisms/Footer';
import { db } from '../../firebase'; // adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
    background-color: #ffffff;
`;

const HeroSection = styled.div`
  color: #ffffff;
  padding: 50px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  height: 400px;
  border-bottom: 1px solid #000;
  background-image: url("https://media.gettyimages.com/id/629589560/photo/central-riga-latvia.jpg?s=612x612&w=0&k=20&c=XkwNZr0K6LvFfNKjeONr4943dTO2Mdw5WTt3Zm65N3c=");
`;

const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    padding: 20px;
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
    margin-top: 30px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const SearchBar = styled.input.attrs({ type: 'search' })`
    width: 300px;
    height: 30px;
    margin-bottom: 20px;

`;

const ProductCard = styled.div`
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

const TextTitle = styled.h2`
  font-size: 20px;
  text-align: left;
  padding: 0px 50px 10px 10px;
  color: #2c6602;
`;

const Date = styled.h4`
  font-size: 15px;
  text-align: left;
  padding: 10px;
  color: black;
`;

const InfoButton = styled.button`
  margin: 0px 0px 10px 10px;
  background-color: #e0f1f1;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
`;

const Price = styled.p`
  font-size: 18px;
  padding: 10px;
  color: black;
`;

const Button = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
`;

const Image = styled.img`
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

const filterOptions = [
  { value: 'All', label: 'All' },
  { value: 'Outdoor', label: 'Outdoor' },
  { value: 'Indoor', label: 'Indoor' },
  // Add more options as needed
];

const Activities: React.FC = () => {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesCol = collection(db, 'activities');
      const activitySnapshot = await getDocs(activitiesCol);
      const newActivities = activitySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        images: doc.data().images,
        date: doc.data().date,
        shortDescription: doc.data().shortDescription,
        category: doc.data().category,
      })) as Activity[];

      setAllActivities(newActivities);
      setActivities(newActivities);
    };

    fetchActivities();
  }, []);

  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    // Set the selectedProduct in the local storage
    localStorage.setItem('selectedProduct', productId);
  
    // Navigate to the payment page
    navigate('/reservation');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterActivities(event.target.value, filter);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    filterActivities(searchTerm, filter);
  };

  const filterActivities = (term: string, filter: string) => {
    let filteredActivities = allActivities;
    if (term) {
      filteredActivities = filteredActivities.filter(activity =>
        activity.title?.toLowerCase().includes(term.toLowerCase()) ||
        activity.shortDescription?.toLowerCase().includes(term.toLowerCase()) ||
        activity.description?.toLowerCase().includes(term.toLowerCase())
      );
    }
    if (filter !== 'All') {
      filteredActivities = filteredActivities.filter(activity =>
        activity.category === filter
      );
    }
    setActivities(filteredActivities);
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Container>
        <HeroSection>
          <h1>Welcome to Our Activities</h1>
          <p>Find the best activities for your needs</p>
          <p>Find the best activities for your needs</p>
          <p>Find the best activities for your needs</p>
          <p>Find the best activities for your needs</p>
        </HeroSection>
        <SearchBar placeholder="Search activities..." value={searchTerm} onChange={handleSearch} />
        <Select
          options={filterOptions}
          defaultValue={filterOptions[0]}
          onChange={(option) => option && handleFilterChange(option.value)}
        />
        <ProductList>
          {activities.map((activity, index) => (
            <ProductCard key={index}>
              <Image src={activity.images[0]} alt={activity.title} />
              <Date>{activity.date}</Date>
              <TextTitle>{activity.title}</TextTitle>
              <InfoButton onClick={() => navigate(`/activity/${activity.id}`)}>More info</InfoButton>
            </ProductCard>
          ))}
        </ProductList>
      </Container>
      <Footer />
    </>
  );
};

export default Activities;