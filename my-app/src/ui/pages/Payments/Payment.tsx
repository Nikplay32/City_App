import React, { useState, useEffect } from 'react';
import { collection, addDoc, where, getDocs, query, doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import { RiIdCardLine } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { MdOutlinePassword } from "react-icons/md";
import { AiFillLock } from 'react-icons/ai';
import Select from 'react-select';
import CardContainer from '../../organisms/CardContainer';
import InputField from '../../atoms/InputField';
import { Button, Expiry, VisaChip, NFCIcon, BankLogo, Form, InputContainer, InputIcon, Input, CardIssuerInfo, CardBrandLogo, CardholderAgreementInfo, CardHolder, CardNumber, Card, CardFace, CardChip, BankName, FrontFace, BackFace, MagneticStripe, MagneticStripeText, SecurityFeatures, SignatureStrip, CVV, CVVLabel } from './Payment.styles'
import { styled } from 'styled-components';
import GlobalStyles from '../../atoms/GlobalStyles';
import Navbar from '../../organisms/Navbar';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;
	height: 100vh;
`;

const options = [
	{ value: 'month', label: 'Monthly Subscription - 9.99 €' },
	{ value: 'year', label: 'Yearly Subscription - 99.99 €' },
];

const paymentMethods = [
	{ value: 'visa', label: 'Visa', logo: 'https://cdn.icon-icons.com/icons2/3261/PNG/512/visa_logo_icon_206647.png', bankName: 'https://res.cloudinary.com/enefit/image/upload/f_auto,q_auto:best/v1645191224/lv/B2C/luminor-logo.png' },
	{ value: 'mastercard', label: 'Mastercard', logo: 'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mcbc_debit-rev_84px.png', bankName: 'https://www.swedbank.com/content/dam/swedbank/brand-manager/sketches/Our%20logotype_626px.png' },
	{ value: 'maestro', label: 'Maestro', logo: 'https://www.about-payments.com/logo/230/150/570', bankName: 'https://play-lh.googleusercontent.com/Dcbim9OFpfRG4j4wAqQvEiH-gmpYPR22FVAN7ilW4o_4TJYi0YRt-qfE3zFBg7FlMw=w600-h300-pc0xffffff-pd' },
];

const PaymentForm: React.FC = () => {
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvv, setCvv] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [isPaid, setIsPaid] = useState(false);
	const [expiry, setExpiry] = useState('');
	const [cardHolderName, setCardHolderName] = useState('');
	const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [subscriptionType, setSubscriptionType] = useState('month'); 
	const subscriptionPrice = subscriptionType === 'month' ? 9.99 : 99.99; 


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
		const formattedValue = value
			.replace(/\D/g, '')
			.replace(/^(\d{2})(\d{0,2})$/, '$1/$2')
			.slice(0, 5); 
		setExpiryDate(formattedValue);
		setExpiry(formattedValue);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const paymentsQuery = query(collection(db, 'payments'), where('userId', '==', user.uid));
				const paymentsSnapshot = await getDocs(paymentsQuery);
				paymentsSnapshot.forEach((doc) => {
					if (doc.data().status === 'success') {
						setIsPaid(true);
					}
				});
			} else {
				navigate('/authorization');
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const paymentsQuery = query(collection(db, 'payments'), where('userId', '==', user.uid));
				const paymentsSnapshot = await getDocs(paymentsQuery);
				paymentsSnapshot.forEach((doc) => {
					if (doc.data().status === 'success') {
						setIsPaid(true);
					}
				});

				const userRef = doc(db, 'users', user.uid);
				const userSnapshot = await getDoc(userRef);
				if (userSnapshot.exists()) {
					setIsSubscribed(userSnapshot.data().isSubbed);
				} else {
					console.error('User document does not exist');
				}
			} else {
				navigate('/authorization');
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length !== 16) {
			toast.error('Invalid card number. Please enter a 16-digit card number.');
			return;
		}
		// Basic form validation
		if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
			toast.error('Invalid expiry date. Please enter in the format MM/YY.');
			return;
		}

		// Extracting year from expiry date
		if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?(24)$/)) { 
			toast.error('Invalid expiry date. Please enter in the format MM/YY');
			return;
		}

		if (!cvv || cvv.length !== 3) {
			toast.error('Invalid CVV. Please enter a 3-digit CVV.');
			return;
		}
		if (!password || password.length < 6) {
			toast.error('Invalid password. Please enter a password with at least 6 characters.');
			return;
		}

		if (!cvv || cvv.length !== 3) {
			toast.error('Invalid CVV. Please enter a 3-digit CVV.');
			return;
		}

		if (!cardHolderName.trim().includes(' ')) {
			toast.error('Invalid cardholder name. Please enter first and last name.');
			return;
		}

		if (auth.currentUser !== null && auth.currentUser.email !== null) {
			const credential = EmailAuthProvider.credential(
				auth.currentUser.email,
				password
			);
			reauthenticateWithCredential(auth.currentUser, credential)
				.then(async () => {

					const paymentStatus = Math.random() > 0.2 ? 'success' : 'failure';

					if (auth.currentUser) {
						const paymentsRef = collection(db, 'payments');
						await addDoc(paymentsRef, {
							userId: auth.currentUser.uid,
							cardHolder: cardHolderName,
							status: paymentStatus,
							price: subscriptionPrice,
							type: subscriptionType,
							paymentMethod: paymentMethod.value,
						});

						if (paymentStatus === 'success') {
							if (auth.currentUser) {
								const userRef = doc(db, 'users', auth.currentUser.uid);
								await updateDoc(userRef, {
									isSubbed: true
								});
							}
							toast.success('Payment successful!');
							setIsPaid(true);
							navigate('/success');
						} else {
							toast.error('Payment failed. Please try again.');
							setIsPaid(false);
							navigate('/failed');
						}
					} else {
						toast.error('You must be signed in to make a payment.');
					}
				})
				.catch(() => {
					toast.error('Incorrect password. Please try again.');
				});
		} else {
			toast.error('You must be signed in to make a payment.');
		}
	};

	return (
		<>
			{isSubscribed ? (
				navigate('/profile') 
			) : (
				<><Navbar></Navbar>
					<Container>
						<GlobalStyles></GlobalStyles>

						<ToastContainer />
						<Form onSubmit={handleSubmit}>
							<CardContainer
								paymentMethod={paymentMethod}
								cardNumber={cardNumber}
								cardHolderName={cardHolderName}
								expiry={expiry}
								cvv={cvv}
							/>
							<div style={{ paddingBottom: '20px' }}>
								<Select
									options={options}
									value={options.find(option => option.value === subscriptionType)}
									onChange={(selectedOption) => {
										if (selectedOption) {
											setSubscriptionType(selectedOption.value);
										}
									}}
									required
								/>
							</div>
							<Select
								options={paymentMethods}
								value={paymentMethods.find(option => option.value === paymentMethod.value)}
								onChange={(selectedOption) => {
									if (selectedOption) {
										setPaymentMethod(selectedOption);
									}
								}}
								required
							/>
							<InputField
								type="text"
								placeholder="Card Number"
								value={cardNumber}
								onChange={handleCardNumberChange}
								Icon={RiIdCardLine}
							/>
							<InputField
								type="text"
								placeholder="Cardholder Name"
								value={cardHolderName}
								onChange={(value) => setCardHolderName(value)}
								Icon={RiIdCardLine}
							/>
							<InputField
								type="text"
								placeholder="Expiry Date (MM/24)"
								value={expiryDate}
								onChange={handleExpiryDateChange}
								Icon={IoMdCalendar}
							/>
							<InputField
								type="text"
								placeholder="CVV"
								value={cvv}
								onChange={(value) => {
									const formattedValue = value.replace(/\D/g, '').slice(0, 3);
									setCvv(formattedValue);
								}}
								Icon={AiFillLock}
							/>
							<InputField
								type="password"
								placeholder="Password"
								value={password}
								onChange={(value) => setPassword(value)}
								Icon={MdOutlinePassword}
							/>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Button type="submit" disabled={isPaid}>
									{isPaid ? 'Payment Successful' : `Pay ${subscriptionPrice}€`}
								</Button>
							</div>
						</Form>
					</Container>
				</>
			)}
		</>
	);
};

export default PaymentForm;