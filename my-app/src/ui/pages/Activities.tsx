import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import Footer from '../organisms/Footer';
import { db } from '../../firebase'; // adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Select from 'react-select';
import {
  Container,
  HeroSection,
  HeroImage,
  ProductList,
  Title,
  SearchBar,
  ProductCard,
  TextTitle,
  StyledDate,
  InfoButton,
  NotFoundMessage,
  Image,
  SearchBarContainer,
  SearchIcon,
  CloseIcon,
  FilterContainer
} from './Activities.styles';

import {
  PaginationContainer,
  PageNumber,
  PageButton,
} from './Products.styles';

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

const sortOptions = [
  { value: 'Earliest', label: 'Earliest' },
  { value: 'Latest', label: 'Latest' },
  // Add more options as needed
];

const Activities: React.FC = () => {
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Earliest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(allActivities.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const productsOnCurrentPage = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleSortChange = (sort: string) => {
    setSort(sort);
    sortActivitiesByDate(sort);
  };

  const convertDate = (date: string) => {
    const parts = date.split(' ');
    const dayMonth = parts[1].split('.');
    const year = parts[2];
    return new Date(`${year}-${dayMonth[1]}-${dayMonth[0]}`);
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

  const sortActivitiesByDate = (sort: string) => {
    let sortedActivities = [...activities];
    if (sort === 'Earliest') {
      sortedActivities.sort((a: Activity, b: Activity) => convertDate(a.date).getTime() - convertDate(b.date).getTime());
    } else {
      sortedActivities.sort((a: Activity, b: Activity) => convertDate(b.date).getTime() - convertDate(a.date).getTime());
    }
    setActivities(sortedActivities);
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Container>
        <HeroSection>
          <Title>Welcome to Activities</Title>
          <HeroImage src="https://freepngimg.com/save/86758-building-city-2d-game-computer-video-graphics/2067x1001" width="600px" alt="" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        </HeroSection>
        <SearchBarContainer>
          <SearchBar placeholder="Search products..." value={searchTerm} onChange={handleSearch} />
          {searchTerm ? <CloseIcon size={20} onClick={() => setSearchTerm('')} /> : <SearchIcon size={20} />}
        </SearchBarContainer>
        <FilterContainer>
          <Select
            options={filterOptions}
            defaultValue={filterOptions[0]}
            onChange={(option) => option && handleFilterChange(option.value)}
          />
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(option) => option && handleSortChange(option.value)}
          />
        </FilterContainer>
        <ProductList>
          {productsOnCurrentPage.length > 0 ? (
            productsOnCurrentPage.map((activity, index) => (
              <ProductCard key={index}>
                <Image src={activity.images[0]} alt={activity.title} />
                <StyledDate>{activity.date}</StyledDate>
                <TextTitle>{activity.title}</TextTitle>
                <InfoButton onClick={() => navigate(`/activity/${activity.id}`)}>More info</InfoButton>
              </ProductCard>
            ))
          ) : (
            <NotFoundMessage>
                  <h2>Oops!</h2>
                  <p>We couldn't find any products that match your search.</p>
                  <p>Please try again with different keywords.</p>
                </NotFoundMessage>
          )}
        </ProductList>
        <PaginationContainer>
              <PageButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FaChevronLeft />
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <PageNumber
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{ color: pageNumber === currentPage ? '#007bff' : 'black' }}
                >
                  {pageNumber}
                </PageNumber>
              ))}
              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaChevronRight />
              </PageButton>
            </PaginationContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Activities;