import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import styled from 'styled-components';
import Footer from '../organisms/Footer';
import { Circle } from 'react-leaflet';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const customIcon = L.icon({
  iconUrl: process.env.PUBLIC_URL + '/location-pin.png',
  iconSize: [40, 40],
});

const templeIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/landmark.png',
    iconSize: [40, 40],
});

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


const Hero = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
`;

const HeroSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const StyledMapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  padding: 2rem;
  flex-grow: 1;
`;

const StyledMap = styled.div`
  flex: 1;
  height: 90%;
  margin-right: 2rem;
  .leaflet-container {
    height: 100%;
    border: 4px solid #333;
    border-radius: 10px;
  }
`;

const PopupContainer = styled.div`
  text-align: center;
`;

const PopupImage = styled.img`
  width: 70%;
  height: auto;
`;

const PopupTitle = styled.h2`
  // Add your styles here...
`;

const PopupDescription = styled.p`
  // Add your styles here...
`;

const GuideContainer = styled.div`
  height: 90%;
  border: 4px solid #333;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GuideItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const GuideIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
`;

const RigaMap: React.FC = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
  const getMarkers = async () => {
    const markersCol = collection(db, 'markers');
    const markerSnapshot = await getDocs(markersCol);

    console.log("Snapshot from Firestore:", markerSnapshot); // Log snapshot from Firestore

    markerSnapshot.docs.forEach((doc) => {
      console.log("Document ID:", doc.id); // Log document ID
      console.log("Document data:", doc.data()); // Log document data
    });
  };

  getMarkers();
}, []);

  return (
    <PageContainer>
      <GlobalStyles/>
      <Navbar/>
      <Hero>
        <HeroSection>
          <h1>Hero Section 1</h1>
          <p>Content for hero section 1...</p>
        </HeroSection>
        <HeroSection>
          <h1>Hero Section 2</h1>
          <p>Content for hero section 2...</p>
        </HeroSection>
      </Hero>
      <StyledMapContainer>
        <StyledMap>
          <MapContainer center={userLocation || [56.9496, 24.1052]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userLocation || [56.94887678967491, 24.103300483578256]} icon={customIcon}>
              <Popup>
                <div>
                  <p>You are currently here!</p>
                  <button onClick={() => navigate('/')}>Go to main page</button>
                </div>
              </Popup>
            </Marker>
            <Marker position={[56.95153145668935, 24.11327211349489]} icon={templeIcon}>
            <Popup>
                <PopupContainer>
                <PopupImage src="https://www.latvia.travel/sites/default/files/styles/mobile_promo/public/media_image/tourism_sight/brivibas-pimineklis-latvia-travel.jpg?itok=S8MRvR8m" alt="Freedom Monument" />
                <PopupTitle>Freedom Monument</PopupTitle>
                <PopupDescription>A memorial honouring soldiers killed during the Latvian War of Independence.</PopupDescription>
                </PopupContainer>
            </Popup>
            </Marker>
            <Circle center={userLocation || [56.9496, 24.1052]} radius={200} />
          </MapContainer>
        </StyledMap>
        <GuideContainer>
        <h2>Guide for Map</h2>
        <GuideItem>
            <GuideIcon src={process.env.PUBLIC_URL + '/location-pin.png'} alt="Your location" />
            <p>The red marker indicates your current locations.</p>
        </GuideItem>
        <GuideItem>
            <GuideIcon src={process.env.PUBLIC_URL + '/landmark.png'} alt="Landmark location" />
            <p>The green marker indicates landmark locations.</p>
        </GuideItem>
        </GuideContainer>
      </StyledMapContainer>
      <Footer/>
    </PageContainer>
  );
}
export default RigaMap;