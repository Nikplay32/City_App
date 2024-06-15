import React, { useState } from 'react';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import { ChangeEvent } from 'react';
import { Container, Select, Street, Button, RouteTitle, TableHead, TableBody, TableHeader, TableRow, Sidebar, MainContent, TimeTable, TimeCell, TransportNavItem, TransportNavbar } from './Transport.styles'

const initialTimes = ['05:41', '06:06', '06:36', '07:06', '07:36', '08:06', '08:33', '08:57', '09:21', '09:44', '10:08', '10:33', '10:56', '11:21', '11:46', '12:10', '12:34', '12:58', '13:22', '13:46', '14:10', '14:34', '14:58', '15:22', '15:46', '16:10', '16:34', '16:58', '17:22', '17:52', '18:23', '18:51', '19:26', '20:00', '20:28', '20:58', '21:31', '22:16', '23:01'];


const routeData = [
  // Existing Bus routes
  {
    transportType: 'Bus',
    route: '2 - Abrenes iela - Vecmīlgrāvis',
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
  // New Bus routes
  {
    transportType: 'Bus',
    route: '5 - Ziepniekkalns - Sarkandaugava',
    streets: [
      "Ziepniekkalns",
      "Turgeņeva iela",
      "Miera iela",
      "Brīvības gatve",
      "Sarkandaugava",
    ],
    times: generateTimes(initialTimes)
  },
  {
    transportType: 'Bus',
    route: '7 - Pļavnieki - Ķengarags',
    streets: [
      "Pļavnieki",
      "Lāčplēša iela",
      "Centrālā stacija",
      "Maskavas iela",
      "Ķengarags",
    ],
    times: generateTimes(initialTimes)
  },
  // Existing Tram routes
  {
    transportType: 'Tram',
    route: '3 - Centrālā stacija - Imanta',
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
  // New Tram routes
  {
    transportType: 'Tram',
    route: '1 - Mežaparks - Jugla',
    streets: [
      "Mežaparks",
      "Čaka iela",
      "Brīvības iela",
      "Ganību dambis",
      "Jugla",
    ],
    times: generateTimes(initialTimes)
  },
  {
    transportType: 'Tram',
    route: '6 - Teika - Āgenskalns',
    streets: [
      "Teika",
      "Biķernieku iela",
      "Centrālā stacija",
      "Kalnciema iela",
      "Āgenskalns",
    ],
    times: generateTimes(initialTimes)
  },
  // Existing Trolleybus routes
  {
    transportType: 'Trolleybus',
    route: '4 - Centrālā stacija - Mežaparks',
    streets: [
      "Centrālā stacija",
      "Kr. Barona iela",
      "Elizabetes iela",
      "Dzirnavu iela",
      "Brīvības iela",
      "Mūkusalas iela",
      "Mežaparks",
    ],
    times: generateTimes(initialTimes)
  },
  // New Trolleybus routes
  {
    transportType: 'Trolleybus',
    route: '9 - Šķirotava - Zolitūde',
    streets: [
      "Šķirotava",
      "Lāčplēša iela",
      "Centrālā stacija",
      "Imantas iela",
      "Zolitūde",
    ],
    times: generateTimes(initialTimes)
  },
  {
    transportType: 'Trolleybus',
    route: '14 - Purvciems - Āgenskalns',
    streets: [
      "Purvciems",
      "Brīvības gatve",
      "Centrālā stacija",
      "Kalnciema iela",
      "Āgenskalns",
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

const Transport = () => {
	const [selectedTransport, setSelectedTransport] = useState('Bus');
	const [selectedRoute, setSelectedRoute] = useState({ ...routeData[0], times: initialTimes });
	const [originalTimes, setOriginalTimes] = useState<string[]>(initialTimes);


	const handleTransportChange = (transport: string) => {
		setSelectedTransport(transport);
		const filteredRoutes = routeData.filter(route => route.transportType === transport);
		setSelectedRoute({ ...filteredRoutes[0], times: initialTimes });
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
				<TransportNavItem onClick={() => handleTransportChange('Trolleybus')}>Trolleybus</TransportNavItem>
			</TransportNavbar>
			<Container>
				<Sidebar>
					<Select onChange={handleRouteChange} value={selectedRoute.route}>
						{routeData
							.filter(route => route.transportType === selectedTransport)
							.map((route, index) => (
								<option key={index} value={route.route}>
									{route.route}
								</option>
							))}
					</Select>
					{selectedRoute.streets.map((street: string, index: number) => (
						<Street key={index} onClick={() => handleClick(street)}>
							{street}
						</Street>
					))}
					 <Button onClick={() => window.location.href = '/tickets'}>Buy Ticket</Button>
				</Sidebar>
				<MainContent>
					<RouteTitle>{selectedRoute.route}</RouteTitle>
					<TimeTable>
						<TableHead>
							<TableRow>
								<TableHeader>Hour</TableHeader>
								<TableHeader>Weekdays</TableHeader>
								<TableHeader>Weekends</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.entries(groupedTimes).map(([hour, times]) => (
								<TableRow key={hour}>
									<TimeCell>{hour}</TimeCell>
									<TimeCell>{times.join(', ')}</TimeCell>
									<TimeCell>{times.join(', ')}</TimeCell> {/* Update this to display weekend times */}
								</TableRow>
							))}
						</TableBody>
					</TimeTable>
				</MainContent>
			</Container>
		</>
	);
};

export default Transport;