import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import Footer from '../organisms/Footer';
import { Circle } from 'react-leaflet';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: auto;
`;

const StyledMapContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

interface MapProps {
	iconUrl: string;
	coordinates: [number, number];
	location: string;
	title: string;
}
const RigaMap: React.FC<MapProps> = ({ iconUrl, coordinates, location, title }) => {
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


			markerSnapshot.docs.forEach((doc) => {
				console.log("Document ID:", doc.id); // Log document ID
				console.log("Document data:", doc.data()); // Log document data
			});
		};

		getMarkers();
	}, []);

	const customIcon = L.icon({
		iconUrl,
		iconSize: [30, 30],
	});

	const minLat = 56.90;
	const maxLat = 56.99;
	const minLng = 24.10;
	const maxLng = 24.20;
	const numMarkers = Math.floor(Math.random() * 8) + 1;

	// Generate random positions for each marker
	const markers: [number, number][] = Array.from({ length: numMarkers }, (): [number, number] => {
		const lat = Math.random() * (maxLat - minLat) + minLat;
		const lng = Math.random() * (maxLng - minLng) + minLng;
		return [lat, lng];
	});
	return (
		<PageContainer>
			<StyledMapContainer>
				<StyledMap>
					<MapContainer center={coordinates || [56.9496, 24.1052]} zoom={13} style={{ height: "300px", width: "100%" }}>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
						<Marker position={coordinates} icon={customIcon}>
							<Popup>
								<div>
									<h2>{title}</h2>
									<p>It will be here: {location}</p>
								</div>
							</Popup>
						</Marker>
					</MapContainer>
				</StyledMap>
			</StyledMapContainer>
		</PageContainer>
	);
}
export default RigaMap;