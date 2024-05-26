import React, { useEffect, useState } from 'react';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; // Importing React Icons
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"; // Icons for increment and decrement
import styled from 'styled-components';
import { BsCart4 } from "react-icons/bs";
import InputField from '../atoms/InputField';
import { RiIdCardLine } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { AiFillLock } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  flex: 1;
  margin-left: 10px;
  border: 2px solid lightgreen;
  padding: 20px;
	@media screen and (max-width: 768px) {
		margin-top: 20px;
		flex: none;
		width: fit-content;
	}
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Icon = styled.span`
  margin-right: 10px;
  font-size: 1.2rem;
`;

const Price = styled.div`
  font-size: 1.2rem;
  color: #4caf50; /* Green color for price */
  margin-top: 10px;
`;

const AddToCartButton = styled.button`
  background: #4caf50; /* Green background */
  color: #fff;
  border: none;
  padding: 12px 20px; /* Increased padding */
  font-size: 1.2rem; /* Increased font size */
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease; /* Smooth transition */
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #388e3c; /* Darker green on hover */
  }
`;

const TicketType = styled.div`
  font-size: 1.2rem;
  margin-top: 10px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const DownloadGuide = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  p {
    margin: 5px 0;
  }
`;


interface FormComponentProps {
	title: string;
	location: string;
	date: string; // or Date, or number, depending on what `time` is supposed to be
	price: number; // or string, depending on what `price` is supposed to be
	onAddToCart: (quantity: number, totalPrice: number) => void;  // or any other function type that matches your function
}

const FormComponent: React.FC<FormComponentProps> = ({ title, location, date, price, onAddToCart }) => {
	const [isBuying, setIsBuying] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [formStep, setFormStep] = useState(0);
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvv, setCvv] = useState('');
	const [totalPrice, setTotalPrice] = useState(price);
	const [cardHolderName, setCardHolderName] = useState('');
	const [isConfirmed, setIsConfirmed] = useState(false);

	useEffect(() => {
		// Update the total price whenever quantity or price changes
		setTotalPrice(quantity * price);
	}, [quantity, price]);


	const handleBuyClick = () => {
		setIsBuying(true)
		setFormStep(prevStep => prevStep + 1);
	};

	const handleAddToCart = () => {
		setFormStep(prevStep => prevStep + 1);
	};

	const handleAddToCartClick = () => {
		if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length !== 16) {
			toast.error('Invalid card number. Please enter a 16-digit card number.');
			return;
		}
		if (!cardHolderName.trim().includes(' ')) {
			toast.error('Invalid cardholder name. Please enter first and last name.');
			return;
		}
		if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?(24)$/)) {
			toast.error('Invalid expiry date. Please enter in the format MM/YY');
			return;
		}
		if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
			toast.error('Invalid expiry date. Please enter in the format MM/YY.');
			return;
		}
		if (!cvv || cvv.length !== 3) {
			toast.error('Invalid CVV. Please enter a 3-digit CVV.');
			return;
		}

		handleAddToCart();
		onAddToCart(quantity, totalPrice);
		
	};

	const handleIncrement = () => {
		if (quantity < 5) {
			setQuantity(prevQuantity => prevQuantity + 1);
		} else {
			toast.error('You can only buy up to 5 tickets.');
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity(prevQuantity => prevQuantity - 1);
		}
	};
	const handleCardNumberChange = (value: string) => {
		// Remove all non-digit characters
		const formattedValue = value.replace(/\D/g, '');
		// Limit the number of digits to 16
		const newValue = formattedValue.slice(0, 16);
		// Add a space after every 4 digits
		const formattedNumber = newValue.replace(/(.{4})/g, '$1 ');
		setCardNumber(formattedNumber);
	};

	const handleExpiryDateChange = (value: string) => {
		// Format expiry date to add "/" after every 2 characters and ensure year 24 is included
		const formattedValue = value
			.replace(/\D/g, '') // Remove non-digit characters
			.replace(/^(\d{2})(\d{0,2})$/, '$1/$2') // Add "/" after every 2 characters
			.slice(0, 5); // Limit to MM/YY format
		setExpiryDate(formattedValue);
	};

	return (
		<>
			<ToastContainer></ToastContainer>
			<FormContainer>
				{formStep === 0 && (
					<>
						<FormGroup>
							<Label>Time of Event</Label>
							<Info>
								<Icon><FaClock /></Icon>
								<span>{date}</span>
							</Info>
						</FormGroup>
						<FormGroup>
							<Label>Location</Label>
							<Info>
								<Icon><FaMapMarkerAlt /></Icon>
								<span>{location}</span>
							</Info>
						</FormGroup>
						<FormGroup>
							<Label>Ticket Type</Label>
							<TicketType>{title}</TicketType>
						</FormGroup>
						<AddToCartButton onClick={handleBuyClick}>
							<BsCart4 /> Buy Ticket
						</AddToCartButton>
					</>
				)}
				{formStep === 1 && (
					<>
						<FormGroup>
							<Label>Quantity</Label>
							<QuantitySelector>
								<QuantityButton onClick={handleDecrement}><IoRemoveCircleOutline /></QuantityButton>
								<span>{quantity}</span>
								<QuantityButton onClick={handleIncrement}><IoAddCircleOutline /></QuantityButton>
							</QuantitySelector>
						</FormGroup>
						<FormGroup>
							<Label>Price per Ticket</Label>
							<span>€{price}</span>
							<DownloadGuide>
								<p>You will receive your tickets as a PDF after purchase.</p>
								<p>Please download it after puchase and save somewhere</p>
							</DownloadGuide>
						</FormGroup>
						<AddToCartButton onClick={handleAddToCart}>
							<BsCart4 /> Buy {quantity} Tickets
						</AddToCartButton>
					</>
				)}
				{formStep === 2 && (
					<>
						<FormGroup>
							<Label>Selected Quantity</Label>
							<span>{quantity}</span>
						</FormGroup>
						<FormGroup>
							<Label>Total Price</Label>
							<Price>{totalPrice}€</Price>
						</FormGroup>
						<FormGroup>
							<InputField
								type="text"
								placeholder="Card Number"
								value={cardNumber}
								onChange={handleCardNumberChange}
								Icon={RiIdCardLine}
							/>
						</FormGroup>
						<FormGroup>
							<InputField
								type="text"
								placeholder="Cardholder Name"
								value={cardHolderName}
								onChange={(value) => setCardHolderName(value)}
								Icon={RiIdCardLine}
							/>
						</FormGroup>
						<FormGroup>
							<InputField
								type="text"
								placeholder="Expiry Date (MM/YY)"
								value={expiryDate}
								onChange={handleExpiryDateChange}
								Icon={IoMdCalendar}
							/>
						</FormGroup>
						<FormGroup>
							<InputField
								type="text"
								placeholder="CVV"
								value={cvv}
								onChange={(value) => setCvv(value)}
								Icon={AiFillLock}
							/>
						</FormGroup>
						<AddToCartButton onClick={handleAddToCartClick}>
							<BsCart4 /> Purchase
						</AddToCartButton>
					</>
				)}
				{formStep === 3 && isConfirmed && (
					<>
						<h2>Thank you for your purchase!</h2>
						<p>Your tickets will be sent to your email shortly.</p>
					</>
				)}
			</FormContainer>
		</>
	);
};
export default FormComponent;
