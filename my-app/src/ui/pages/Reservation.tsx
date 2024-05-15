import React, { useState, useEffect  } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { components, OptionProps } from 'react-select';
import { collection, addDoc, where, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, Timestamp } from 'firebase/firestore';

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

interface Product {
    title: string;
    images: string[];
    description: string;
    price: number;
    shortDescription: string;
    category: string;
}

const Option: React.FC<OptionProps<any, false>> = ({ children, ...props }) => (
  <components.Option {...props}>
    <div>{children}</div>
    <div>{props.data.description}</div>
    <div>{props.data.price}</div>
  </components.Option>
);

const mileageOptions = [
  {
    value: 'unlimited',
    label: 'Unlimited kilometers',
    description: 'All kilometers are included in the price',
    price: '+ $3.89 / day',
  },
  {
    value: '400_km',
    label: '400 km',
    description: '+$0.16 / for every additional km',
  },
  // Add more options as needed
];

const secondOptionOptions = [
  { value: 'best_price', label: 'Best price', description: 'Pay now, cancel and rebook for a fee' },
  { value: 'stay_flexible', label: 'Stay flexible', description: 'Pay at pick-up, free cancellation and rebooking anytime' },
  // Add more options as needed
];

const PaymentForm: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [mileage, setMileage] = useState(mileageOptions[Math.floor(Math.random() * mileageOptions.length)]);
    const [secondOption, setSecondOption] = useState(secondOptionOptions[Math.floor(Math.random() * secondOptionOptions.length)]); 
    const [cvv, setCvv] = useState('');
    const [password, setPassword] = useState('');
    const subscriptionPrice = 9.99;
    const navigate = useNavigate();
    const [isPaid, setIsPaid] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const productId = localStorage.getItem('selectedProduct');
    console.log('Product ID:', productId);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            // Fetch the user's reservation status
            const reservationsQuery = query(collection(db, 'reservations'), where('userId', '==', user.uid));
            const reservationsSnapshot = await getDocs(reservationsQuery);
            reservationsSnapshot.forEach((doc) => {
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
        const fetchProduct = async () => {
          if (productId) {
            const productDoc = doc(db, 'products', productId);
            const productData = await getDoc(productDoc);
      
            if (productData.exists()) {
              setProduct({
                ...productData.data(),
                images: productData.data().images || [], // Use an empty array as a fallback
              } as Product);
              console.log('Product data:', productData.data());
            } else {
              console.log('No such document!');
            }
          }
        };
      
        fetchProduct();
      }, [productId]);

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
            if (auth.currentUser) {
                const existingReservationQuery = query(
                    collection(db, 'reservations'),
                    where('userId', '==', auth.currentUser.uid),
                    where('productId', '==', productId)
                  );
                  const existingReservationSnapshot = await getDocs(existingReservationQuery);
                  if (!existingReservationSnapshot.empty) {
                    toast.error('You have already rented this product.');
                    return;
                  }

                const reservationsRef = collection(db, 'reservations');
                await addDoc(reservationsRef, {
                  userId: auth.currentUser.uid,
                  productId: productId,
                  mileage: mileage.value,
                  secondOption: secondOption.value,
                  reservationTime: Timestamp.now(),
                });
      
                navigate('/profile');
              } else {
                toast.error('You must be signed in to make a reservation.');
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
        <Select
          options={mileageOptions}
          components={{
            Option: Option,
          }}
          value={mileage}
          onChange={(selectedOption) => setMileage(selectedOption)}
        />
        <Select
          options={secondOptionOptions}
          components={{
            Option: Option,
          }}
          value={secondOption}
          onChange={(selectedOption) => setSecondOption(selectedOption)}
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