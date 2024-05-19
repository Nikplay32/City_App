import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import { ChangeEvent } from 'react';

const initialTimes = ['05:41', '06:06', '06:36', '07:06', '07:36', '08:06', '08:33', '08:57', '09:21', '09:44', '10:08', '10:33', '10:56', '11:21', '11:46', '12:10', '12:34', '12:58', '13:22', '13:46', '14:10', '14:34', '14:58', '15:22', '15:46', '16:10', '16:34', '16:58', '17:22', '17:52', '18:23', '18:51', '19:26', '20:00', '20:28', '20:58', '21:31', '22:16', '23:01'];


const routeData = [
  {
    route: '2Abrenes iela - Vecmīlgrāvis',
    streets: [
      "Abrenes iela",
      "Centrālā stacija",
      "13.janvāra iela",
      "Grēcinieku iela",
      "Nacionālā bibliotēka",
      "A.Grīna bulvāris",
    ],
    times: generateTimes(initialTimes)
  },
  {
    route: '3Centrālā stacija - Imanta',
    streets: [
      "Centrālā stacija",
      "Kr. Barona iela",
      "Elizabetes iela",
      "Dzirnavu iela",
      "Brīvības iela",
      "Mūkusalas iela",
      "Imanta",
    ],
    times: generateTimes(initialTimes)
  },
  // Add more routes as necessary
];

// Function to generate times for a route
function generateTimes(initialTimes: string[]): string[] {
  return [...initialTimes].map((time) => {
    const [hour, minute] = time.split(':');
    const newHour = parseInt(hour);
    const newMinute = parseInt(minute) + Math.floor(Math.random() * 3) + 1; // Add a random number of minutes between 1 and 3
    const newTime = (newHour + Math.floor(newMinute / 60)).toString().padStart(2, '0') + ':' + (newMinute % 60).toString().padStart(2, '0');
    return newTime;
  }).sort((a, b) => {
    const aHour = parseInt(a.split(':')[0]);
    const aMinute = parseInt(a.split(':')[1]);
    const bHour = parseInt(b.split(':')[0]);
    const bMinute = parseInt(b.split(':')[1]);
    return aHour - bHour || aMinute - bMinute;
  });
}


const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 20%;
  border-right: 1px solid #ddd;
  padding: 10px;
`;

const MainContent = styled.div`
  width: 80%;
  padding: 10px;
`;

const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TimeCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TransportNavbar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f8f8f8;
  padding: 10px 0;
`;

const TransportNavItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  color: #333;
  &:hover {
    color: #007BFF;
  }
`;

const Transport = () => {
	const [selectedTransport, setSelectedTransport] = useState('Bus');
  const [selectedRoute, setSelectedRoute] = useState({ ...routeData[0], times: initialTimes });
  const [originalTimes, setOriginalTimes] = useState<string[]>(initialTimes);


	const handleTransportChange = (transport: string) => {
    setSelectedTransport(transport);
  };

	const streetTimes = selectedRoute.streets.reduce<{ [key: string]: number }>((acc: { [key: string]: number }, curr: string, index: number) => {
		acc[curr] = index * 2; // Each street adds 2 minutes
		return acc;
	}, {});

	const groupedTimes = selectedRoute.times.reduce<{ [key: string]: string[] }>((groups, time) => {
		const hour = time.split(':')[0];
		if (!groups[hour]) {
			groups[hour] = [];
		}
		groups[hour].push(time);
		return groups;
	}, {});

	const handleRouteChange = (event: ChangeEvent<HTMLSelectElement>) => {
  const selectedRouteData = routeData.find(route => route.route === event.target.value);
  if (selectedRouteData) {
    setSelectedRoute({ ...selectedRouteData, times: [...originalTimes] });
  }
};
	
	
	const handleClick = (street: string) => {
		const timeToAdd = streetTimes[street]; // Time to add based on the street
	
		// Create a new array of times based on the initial times
		let newTimes = initialTimes.map((time, index) => {
			const [hour, minute] = time.split(':');
			const newHour = parseInt(hour);
			const newMinute = parseInt(minute) + timeToAdd;
			const newTime = (newHour + Math.floor(newMinute / 60)).toString().padStart(2, '0') + ':' + (newMinute % 60).toString().padStart(2, '0');
			return newTime;
		});
	
		// Sort the times in ascending order
		newTimes = newTimes.sort((a, b) => {
			const aHour = parseInt(a.split(':')[0]);
			const aMinute = parseInt(a.split(':')[1]);
			const bHour = parseInt(b.split(':')[0]);
			const bMinute = parseInt(b.split(':')[1]);
			return aHour - bHour || aMinute - bMinute;
		});
	
		// Update the selectedRoute state with the new times
		setSelectedRoute(prevState => ({
			...prevState,
			times: newTimes
		}));
	};

	return (
		<>
			<GlobalStyles></GlobalStyles>
			<Navbar></Navbar>
			<TransportNavbar>
        <TransportNavItem onClick={() => handleTransportChange('Bus')}>Bus</TransportNavItem>
        <TransportNavItem onClick={() => handleTransportChange('Tram')}>Tram</TransportNavItem>
        <TransportNavItem onClick={() => handleTransportChange('Minibus')}>Minibus</TransportNavItem>
      </TransportNavbar>
			<Container>
				<Sidebar>
				<select onChange={handleRouteChange}>
            {routeData.map((route, index) => (
              <option key={index} value={route.route}>
                {route.route}
              </option>
            ))}
          </select>
          {selectedRoute.streets.map((street: string, index: number) => (
            <p key={index} onClick={() => handleClick(street)}>
              {street}
            </p>
          ))}
				</Sidebar>
				<MainContent>
					<h2>{selectedRoute.route}</h2>
					<TimeTable>
						<thead>
							<tr>
								<th>Hour</th>
								<th>Weekdays</th>
								<th>Weekends</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(groupedTimes).map(([hour, times]) => (
								<tr key={hour}>
									<TimeCell>{hour}</TimeCell>
									<TimeCell>{times.join(', ')}</TimeCell>
									<TimeCell>{times.join(', ')}</TimeCell> {/* Update this to display weekend times */}
								</tr>
							))}
						</tbody>
					</TimeTable>
				</MainContent>
			</Container>
		</>
	);
};

export default Transport;