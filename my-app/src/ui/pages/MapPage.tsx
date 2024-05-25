import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Navbar from '../organisms/Navbar';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import GlobalStyles from '../atoms/GlobalStyles';
import { db } from '../../firebase'; // adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import L from 'leaflet';

const FullScreenMapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  display: block; /* Add this line */
  margin: auto; /* Add this line */
  padding: 8px 16px;
  background-color: #007bff; /* Change this to your desired button color */
  color: #ffffff; /* Change this to your desired text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Change this to your desired button hover color */
  }
`;

const Price = styled.h3`
  display: block;
  margin: auto;
  padding-bottom: 1rem;
  text-align: center; // Add this line to center the text
`;

const Date = styled.h3`
  display: block;
  margin: auto;
  text-align: center; // Add this line to center the text
`;

const Location = styled.h3`
  display: block;
  margin: auto;
  text-align: center; // Add this line to center the text
`;

type MarkerType = {
  position: [number, number];
  item: any; // this can be a product or an activity
};

type ItemType = {
  id: string;
  type: string;
  coordinates?: [number, number];
};


const FullScreenMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const productsCol = collection(db, 'products');
      const productSnapshot = await getDocs(productsCol);
      const products = productSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'product', // add a type property to distinguish products from activities
        ...doc.data()
      }));

      const activitiesCol = collection(db, 'activities');
      const activitySnapshot = await getDocs(activitiesCol);
      const activities = activitySnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'activity', // add a type property to distinguish activities from products
        ...doc.data()
      }));

      const items = [...products, ...activities]; // combine the products and activities

      const minLat = 56.90;
      const maxLat = 56.99;
      const minLng = 24.10;
      const maxLng = 24.20;

      const newMarkers: MarkerType[] = items.flatMap((item: ItemType): MarkerType[] => {
        if (item.type === 'product') {
          const numMarkers = Math.floor(Math.random() * 5) + 1;
          return Array.from({ length: numMarkers }, (): MarkerType => {
            const lat = Math.random() * (maxLat - minLat) + minLat;
            const lng = Math.random() * (maxLng - minLng) + minLng;
            return { position: [lat, lng] as [number, number], item: item };
          });
        } else { // item.type === 'activity'
          if (item.coordinates) {
            return [{ position: item.coordinates as [number, number], item: item }]; // use coordinates from database for activities
          } else {
            const lat = Math.random() * (maxLat - minLat) + minLat;
            const lng = Math.random() * (maxLng - minLng) + minLng;
            return [{ position: [lat, lng] as [number, number], item: item }]; // fallback to random coordinates if coordinates are not available in database
          }
        }
      });

      setMarkers(newMarkers);
    };

    fetchItems();
  }, []);

  return (
    <FullScreenMapContainer>
      <Navbar></Navbar>
      <GlobalStyles></GlobalStyles>
      <MapContainer center={userLocation || [56.9496, 24.1052]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => {
          let iconUrl = marker.item.type === 'product' ? marker.item.images[0] : marker.item.iconUrl;// use 'images' for products and 'url' for activities
          iconUrl = iconUrl || 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png';
          const iconSize: L.PointTuple = marker.item.type === 'product' ? [40, 30] : [30, 40];// use different sizes for products and activities
          const icon = L.icon({
            iconUrl: iconUrl, // use the first image of the item
            iconSize: iconSize, // adjust the size as necessary
            iconAnchor: [12, 41], // adjust the anchor as necessary
            popupAnchor: [0, -41] // adjust the anchor as necessary
          });

          return (
            <Marker key={index} position={marker.position} icon={icon}>
              <Popup>
                <div>
                  <h2>{marker.item.title}</h2>
                  <img src={marker.item.images[0]} alt={marker.item.title} style={{ width: '100%', height: 'auto' }} />
                  {marker.item.type === 'product' && <Price>Price: {marker.item.price}€/Day</Price>}
                  {marker.item.type === 'activity' && <Date>Date: {marker.item.date}</Date>}
                  {marker.item.type === 'activity' && <Location>{marker.item.location}</Location>}
                  <Button onClick={() => window.location.href = `/${marker.item.type}/${marker.item.id}`}>More info here</Button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </FullScreenMapContainer>
  );
}
export default FullScreenMap;