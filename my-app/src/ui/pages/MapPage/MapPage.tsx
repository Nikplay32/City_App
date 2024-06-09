import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Navbar from '../../organisms/Navbar';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import GlobalStyles from '../../atoms/GlobalStyles';
import { db } from '../../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  FullScreenMapContainer,
  Button,
  Price,
  Date,
  Location
} from './MapPage.styles';

type MarkerType = {
  position: [number, number];
  item: any; 
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
        type: 'product',
        ...doc.data()
      }));

      const activitiesCol = collection(db, 'activities');
      const activitySnapshot = await getDocs(activitiesCol);
      const activities = activitySnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'activity', 
        ...doc.data()
      }));
      

      const items = [...products, ...activities]; 

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
            return [{ position: item.coordinates as [number, number], item: item }]; 
          } else {
            const lat = Math.random() * (maxLat - minLat) + minLat;
            const lng = Math.random() * (maxLng - minLng) + minLng;
            return [{ position: [lat, lng] as [number, number], item: item }]; 
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
      <MapContainer center={userLocation || [56.9496, 24.1052]} zoom={13} style={{ height: "100%", width: "100%", zIndex: "-1"}}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ'
        />
        {markers.map((marker, index) => {
          let iconUrl = marker.item.type === 'product' ? marker.item.images[0] : marker.item.iconUrl;
          iconUrl = iconUrl || 'https://static-00.iconduck.com/assets.00/map-marker-icon-342x512-gd1hf1rz.png';
          const iconSize: L.PointTuple = marker.item.type === 'product' ? [40, 30] : [30, 40];
          const icon = L.icon({
            iconUrl: iconUrl,
            iconSize: iconSize, 
            iconAnchor: [12, 41], 
            popupAnchor: [0, -41] 
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