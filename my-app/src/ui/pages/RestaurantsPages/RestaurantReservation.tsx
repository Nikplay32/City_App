import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, auth } from '../../../firebase';
import { collection, where, getDocs, query, doc, updateDoc, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	FormContainer,
	FormGroup,
	Label,
	Input,
	Title,
	ReservationDate,
	SelectedDateTime,
	TextArea,
	SubmitButton
  } from './RestaurantReservation.styles';


interface RestaurantFormProps {
	restaurantId: string;
}


const RestaurantForm: React.FC<RestaurantFormProps> = ({ restaurantId }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [name, setName] = useState('');
	const [contactNumber, setContactNumber] = useState('');
	const [comment, setComment] = useState('');
	const [blockedDates, setBlockedDates] = useState<Date[]>([]);
	function getRandomDate(start: Date, end: Date) {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	}

	useEffect(() => {
		const startDate = new Date(); // start date
		const endDate = new Date(); // end date
		endDate.setMonth(endDate.getMonth() + 3); // for example, block dates for the next 3 months

		const dates: Date[] = [];
		for (let i = 0; i < 70; i++) { // for example, block 10 random dates
			dates.push(getRandomDate(startDate, endDate));
		}

		setBlockedDates(dates);
	}, []);
	
	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
	};

	const handleSubmit = async () => {
		try {
			const userId = auth.currentUser?.uid; // Get the current user ID
			if (!userId) {
				throw new Error('No user is currently signed in');
			}

			if (!/^[\w\s]+$/.test(name)) {
				toast.error('Name should only contain letters and spaces.');
				return;
			}
			if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(contactNumber)) {
				toast.error('Contact number should be a valid 10-digit number.');
				return;
			}

			const q = query(
				collection(db, 'restaurant_reservations'),
				where('userId', '==', userId),
				where('restaurantId', '==', restaurantId)
			);
			const querySnapshot = await getDocs(q);
			if (!querySnapshot.empty) {
				toast.error('You have already made a reservation for this restaurant.');
				return;
			}

			// Add the reservation data to the 'reservations' collection in Firestore
			await addDoc(collection(db, 'restaurant_reservations'), {
				name,
				contactNumber,
				comment,
				selectedDate,
				userId, // Add the user ID to the reservation data
				restaurantId, // Add the restaurant ID to the reservation data
			});

			// Reset form fields after successful submission
			setName('');
			setContactNumber('');
			setComment('');
			setSelectedDate(new Date());
			toast.success('Reservation submitted successfully!');
		} catch (error) {
			console.error('Error adding reservation: ', error);
			toast.error('Error adding reservation.');
		}
	};

	return (
		<>
			<ToastContainer />
			<FormContainer>
				<Title>Reservation Details</Title>
				<FormGroup>
					<Label>Name:</Label>
					<Input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter your name"
					/>
				</FormGroup>
				<FormGroup>
					<Label>Contact Number:</Label>
					<Input
						type="tel"
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
						placeholder="Enter your contact number"
					/>
				</FormGroup>
				<FormGroup>
					<Label>Select Date and Time:</Label>
					<ReservationDate
						selected={selectedDate}
						onChange={handleDateChange}
						showTimeSelect
						dateFormat="MMMM d, yyyy h:mm aa"
						inline // Display the calendar inline by default
						excludeDates={blockedDates}
					/>
				</FormGroup>
				<SelectedDateTime>Selected Date and Time: {selectedDate.toLocaleString()}</SelectedDateTime>
				<FormGroup>
					<Label>Comment:</Label>
					<TextArea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Any special requests or comments?"
					/>
				</FormGroup>
				<SubmitButton onClick={handleSubmit}>Make Reservation</SubmitButton>
			</FormContainer>
		</>
	);
};

export default RestaurantForm;
