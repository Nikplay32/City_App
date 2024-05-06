import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import { collection, addDoc, where, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';



const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
`;

const PaymentForm: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [password, setPassword] = useState('');
    const subscriptionPrice = 9.99;
    const navigate = useNavigate();
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // Fetch the user's payment status
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

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      // Basic form validation
      if (!cardNumber || cardNumber.length !== 16) {
        toast.error('Invalid card number. Please enter a 16-digit card number.');
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
      if (!password || password.length < 6) {
        toast.error('Invalid password. Please enter a password with at least 6 characters.');
        return;
      }
  
      // Check if the user is signed in and the email is not null
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
            const paymentStatus = Math.random() > 0.5 ? 'success' : 'failure';
  
            if (auth.currentUser) {
                // Store the payment status in your database
                const paymentsRef = collection(db, 'payments');
                await addDoc(paymentsRef, {
                  userId: auth.currentUser.uid,
                  status: paymentStatus,
                  amount: subscriptionPrice, // Store the subscription price
                });
          
                // Show a toast notification based on the payment status
                if (paymentStatus === 'success') {
                  toast.success('Payment successful!');
                } else {
                  toast.error('Payment failed. Please try again.');
                }
                navigate('/profile');
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
  
    return (
      <>
      <ToastContainer/>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Card Number"
        />
        <Input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="Expiry Date (MM/YY)"
        />
        <Input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          placeholder="CVV"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit" disabled={isPaid}>
          {isPaid ? 'Payment Successful' : `Pay ${subscriptionPrice}`}
        </Button>
      </Form>
      </>
    );
  };
  
  export default PaymentForm;