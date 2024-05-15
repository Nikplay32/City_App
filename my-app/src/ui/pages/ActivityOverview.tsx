
// ProductOverview.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import GlobalStyles from '../atoms/GlobalStyles';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer'
import Map from '../organisms/Map'

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const DescriptionContainer = styled.div`
  flex: 2;
  margin-right: 10px;
`;

const FormContainer = styled.div`
  flex: 1;
  margin-left: 10px;
  border: 2px solid lightgreen;
`;

const Description = styled.div`
  margin: 2rem 0;
  padding: 1rem 0 0 0;
`;

const AddToCartButton = styled.button`
  background: #3e3e3f;
  color: #fff;
  border: none;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 20px;
  transition: color 0.3s ease;
  &:hover {
    background: #565657;
  }
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleText = styled.h1`
  color: #333;
  font-weight: normal;
  padding: 10px 0px 20px 20px;
`;

const TitleBorder = styled.hr`
  border: 0;
  height: 1px;
  background: #e3dddd;
  width: 100%;
`;

interface RouteParams {
  id: string;
}

const ActivityOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        const activityDoc = doc(db, 'activities', id);
        const activityData = await getDoc(activityDoc);

        if (activityData.exists()) {
          setActivity({
            ...activityData.data(),
            images: activityData.data().images || [], // Use an empty array as a fallback
          } as Activity);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchActivity();
  }, [id]);

  const handleAddToCart = () => {
    if (id) {
      // Add the activity to the cart here
      localStorage.setItem('selectedActivity', id);
      // Navigate to the payment page
      navigate('/reservation');
    } else {
      console.error('Activity ID is undefined');
    }
  };

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <GlobalStyles/>
    <Navbar/>
    <ActivityContainer>
      <ImageContainer>
        <Image src={activity.images[activeImageIndex]} alt={`${activity.title} ${activeImageIndex + 1}`} />
      </ImageContainer>
      <TitleContainer>
        <TitleText>{activity.title}</TitleText>
        <TitleBorder />
      </TitleContainer>
      <InfoContainer>
        <DescriptionContainer>
          <Description>
            <p>{activity.description}</p>
            <AddToCartButton onClick={handleAddToCart}>Add To Cart</AddToCartButton>
          </Description>
        </DescriptionContainer>
        <FormContainer>
          {/* Add your form and other data here */}
        </FormContainer>
      </InfoContainer>
    </ActivityContainer>
    <Footer/>
  </>
  );
};

export default ActivityOverview;