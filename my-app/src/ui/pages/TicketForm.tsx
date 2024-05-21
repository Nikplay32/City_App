import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { jsPDF } from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import InputField from '../atoms/InputField';
import { RiIdCardLine } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { MdOutlinePassword } from "react-icons/md";
import { AiFillLock } from 'react-icons/ai';
import { Form, TicketContainer } from '../pages/Payments/Payment.styles'
import Navbar from '../organisms/Navbar';
import TicketGallery from '../organisms/TicketGallery';
import GlobalStyles from '../atoms/GlobalStyles';
import { Button } from './Products.styles';
import { ticketOptions } from '../data/TicketOptions';
import { downloadPDF } from '../pages/TicketGeneration'


const Container = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
`;

const TicketForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(ticketOptions[0]);
  const [qrValue, setQrValuePDF] = useState('');
  const ticketRef = useRef<HTMLDivElement>(null);
  const [transactionId, setTransactionId] = useState('');
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleDownloadPDF = async () => {
    await downloadPDF(selectedTicket, transactionId, qrCodeRef, setQrValuePDF);
  };

  const onSubmit = async (event: React.FormEvent) => {
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
    if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?(24)$/)) { // Ensuring year 2024
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
      // Validate the user's password
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      reauthenticateWithCredential(auth.currentUser, credential)
        .then(async () => {
          // Password is correct, proceed with payment

          // Simulate a payment
          const paymentStatus = Math.random() > 0.2 ? 'success' : 'failure';

          if (auth.currentUser) {
            // Generate a random transaction ID
            const transactionId = '#' + Math.random().toString(36).substring(2);
            setTransactionId(transactionId);

            // Store the payment status and transaction ID in your database
            const ticketsRef = collection(db, 'tickets');
            await addDoc(ticketsRef, {
              userId: auth.currentUser.uid,
              status: paymentStatus,
              type: selectedTicket.value,
              transactionId: transactionId,
            });

            // Show a toast notification based on the payment status
            if (paymentStatus === 'success') {
              // Generate a random QR code value
              setCardNumber('');
              setCardHolderName('');
              setExpiryDate('');
              setCvv('');
              setPassword('');
              setQrValuePDF(Math.random().toString(36).substring(2));
            } else {
              toast.error('Payment failed. Please try again.');
            }
          } else {
            toast.error('You must be signed in to make a payment.');
          }
        })
        .catch(() => {
          // Password is incorrect, show a toast
          toast.error('Incorrect password. Please try again.');
        });
    } else {
      toast.error('You must be signed in to make a payment.');
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
      <GlobalStyles></GlobalStyles>
      <Navbar></Navbar>
      <Container>
        <TicketGallery ticketOptions={ticketOptions} />
        <Form onSubmit={onSubmit}>
          <TicketContainer>
            <img src="https://cdn-icons-png.freepik.com/512/4321/4321824.png" alt="" />
          </TicketContainer>
          <Select
            options={ticketOptions}
            value={selectedTicket}
            onChange={(newValue) => {
              if (newValue !== null) {
                setSelectedTicket(newValue);
              }
            }}
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
            placeholder="Expiry Date (MM/YY)"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            Icon={IoMdCalendar}
          />
          <InputField
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(value) => setCvv(value)}
            Icon={AiFillLock}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
            Icon={MdOutlinePassword}
          />
          {qrValue && (
            <div ref={ticketRef} style={{ display: 'none', border: '1px solid black', padding: '10px', margin: '10px 0' }}>
              <h2>CITYSPIRIT</h2>
              <p>Ticket Type: {selectedTicket.label}</p>
              <div style={{ padding: '10px', border: '2px solid green', display: 'inline-block' }}>
                <div ref={qrCodeRef}><QRCode value={qrValue} renderAs="canvas" /></div>
              </div>
            </div>
          )}
          {qrValue && <Button type="button" onClick={handleDownloadPDF}>Download Your PDF Ticket</Button>}
          <Button type="submit">Buy Ticket</Button>
        </Form>
      </Container>
    </>
  );
};

export default TicketForm;