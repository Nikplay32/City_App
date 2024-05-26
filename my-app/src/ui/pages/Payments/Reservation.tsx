import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { components, OptionProps } from 'react-select';
import { collection, addDoc, where, getDocs, query, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { Button, Form, Reservation, PointsExplanation, Highlight, ProductInfo, Description, Price, ProductDetailsContainer, ImageContainer, DetailsContainer } from './Payment.styles'
import CardContainer from '../../organisms/CardContainer';
import InputField from '../../atoms/InputField';
import { RiIdCardLine } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { MdOutlinePassword } from "react-icons/md";
import { AiFillLock } from 'react-icons/ai';
import { handleSubmit } from '../../atoms/HandleSubmitForm';
import Navbar from '../../organisms/Navbar';
import { FaCoins } from 'react-icons/fa';
import GlobalStyles from '../../atoms/GlobalStyles';
import { secondOptionOptions, mileageOptions } from '../../data/RentalOptions';

interface Product {
  id: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  shortDescription: string;
  specification: string[];
  title: string;
}

interface FormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  password: string;
  cardHolderName: string;
}

const Option: React.FC<OptionProps<any, false>> = ({ children, ...props }) => (
  <components.Option {...props}>
    <div>{children}</div>
    <div>{props.data.description}</div>
    <div>{props.data.price}</div>
  </components.Option>
);

const paymentMethods = [
  { value: 'visa', label: 'Visa', logo: 'https://cdn.icon-icons.com/icons2/3261/PNG/512/visa_logo_icon_206647.png', bankName: 'https://res.cloudinary.com/enefit/image/upload/f_auto,q_auto:best/v1645191224/lv/B2C/luminor-logo.png' },
  { value: 'mastercard', label: 'Mastercard', logo: 'https://nuvei.com/wp-content/uploads/2023/02/mastercard-1.png', bankName: 'https://www.swedbank.com/content/dam/swedbank/brand-manager/sketches/Our%20logotype_626px.png' },
  { value: 'maestro', label: 'Maestro', logo: 'https://www.about-payments.com/logo/230/150/570', bankName: 'https://play-lh.googleusercontent.com/Dcbim9OFpfRG4j4wAqQvEiH-gmpYPR22FVAN7ilW4o_4TJYi0YRt-qfE3zFBg7FlMw=w600-h300-pc0xffffff-pd' },
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
  const [expiry, setExpiry] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const productId = localStorage.getItem('selectedProduct');
  const [duration, setDuration] = useState(1); // Default duration is 1
  const durationOptions = Array.from({ length: 7 }, (_, i) => ({ value: i + 1, label: `${i + 1} day(s)` }));
  const durationOptionsHours = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1} hour(s)` }));

  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);

  // Fetch the user's loyalty points in this useEffect hook
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

        // Fetch the user's loyalty points
        const userDoc = doc(db, 'users', user.uid);
        const userData = await getDoc(userDoc);
        if (userData.exists()) {
          setLoyaltyPoints(userData.data().loyalty_points || 0);
        }
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
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchProduct();
  }, [productId]);

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
    setExpiry(formattedValue);
  };

  const onSubmit = async (event: React.FormEvent) => {
    if (auth.currentUser && product) {
      let totalPrice;
      if (product.category === 'Cars') {
        totalPrice = Math.round((product.price + (mileage?.priceAdjustment || 0) + (secondOption?.priceAdjustment || 0)) * duration * 100) / 100 - pointsToUse;
      } else if (product.category === 'Boards') {
        totalPrice = Math.round(product.price * duration * 100) / 100 - pointsToUse;
      } else {
        totalPrice = product.price - pointsToUse;
      }
  
      const docData = {
        userId: auth.currentUser.uid,
        productId: productId,
        mileage: mileage.value,
        secondOption: secondOption.value,
        reservationTime: Timestamp.now(),
        totalPrice: totalPrice,
      };

      const formValues: FormValues = {
        cardNumber,
        expiryDate,
        cvv,
        password,
        cardHolderName,
      };

      const callback = () => {
        navigate('/profile');
      };

      handleSubmit(event, formValues, 'reservations', docData, callback);
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const userData = await getDoc(userDoc);

      if (userData.exists() && userData.data().isSubbed) {
        // Get the current loyalty points
        const loyaltyPoints = userData.data().loyalty_points || 0;

        // Calculate the new loyalty points
        let newLoyaltyPoints;
        if (pointsToUse > 0) {
          // If the user is using points, subtract the used points and add 10
          newLoyaltyPoints = loyaltyPoints - pointsToUse + 10;
        } else {
          // If the user is not using points, just add 10
          newLoyaltyPoints = loyaltyPoints + 10;
        }

        // Update the user's loyalty points
        await updateDoc(userDoc, { loyalty_points: newLoyaltyPoints });
      }
    } else {
      toast.error('You must be signed in to make a reservation.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar></Navbar>
      <GlobalStyles></GlobalStyles>
      <Reservation>
        <Form onSubmit={onSubmit}>
          <CardContainer
            paymentMethod={paymentMethod}
            cardNumber={cardNumber}
            cardHolderName={cardHolderName}
            expiry={expiry}
            cvv={cvv}
          />
          <div style={{ paddingBottom: '10px' }}>
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
          </div>
          {product?.category === 'Cars' && (
            <>
              <Select
                options={durationOptions}
                defaultValue={durationOptions[0]}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setDuration(selectedOption.value);
                  }
                }}
              />
              <Select
                options={secondOptionOptions}
                components={{
                  Option: Option,
                }}
                value={secondOption}
                onChange={(selectedOption) => setSecondOption(selectedOption)}
              />
              <Select
                options={mileageOptions}
                components={{
                  Option: Option,
                }}
                value={mileage}
                onChange={(selectedOption) => setMileage(selectedOption)}
              />
            </>
          )}
          {product?.category === 'Boards' && (
            <>
              <Select
                options={durationOptionsHours}
                defaultValue={durationOptionsHours[0]}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setDuration(selectedOption.value);
                  }
                }}
              />
            </>
          )}
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
          <h2>Loyalty points</h2>
          <InputField
            type="number"
            placeholder="Loyalty Points to Use"
            value={pointsToUse.toString()}
            onChange={(value) => {
              const points = parseInt(value, 10);
              if (points >= 0 && points <= loyaltyPoints) {
                setPointsToUse(points);
              }
            }}
            Icon={FaCoins}
          />
          <Button type="submit" disabled={isPaid}>
            {isPaid ? 'Payment Successful' : `Pay now`}
          </Button>
        </Form>
        <ProductInfo>
          <ProductDetailsContainer>
            {product && (
              <>
                <h2>{product.title}</h2>
                <ImageContainer>
                  {product.images.length > 0 && (
                    <img src={product.images[0]} alt={product.title} />
                  )}
                </ImageContainer>
                <PointsExplanation>
                  <h3>Loyalty Points:</h3>
                  <p>
                    Loyalty points are rewards earned by customers for their continuous business with us. You can accumulate these points over time and redeem them for discounts or special offers on future purchases. You can use these points now to reduce the total price of your reservation.
                  </p>
                  <h3>Current Balance:</h3>
                  <p>
                  <Highlight>Your current balance of loyalty points is {loyaltyPoints} €</Highlight>. You can choose to use these points to reduce the total price of your reservation.
                  </p>
                </PointsExplanation>
                <DetailsContainer>
                  <Description>{product.description}</Description>
                  <Price>
                    Total Price: <Highlight>{product?.category === 'Cars' ?
                      (Math.round((product.price + (mileage?.priceAdjustment || 0) + (secondOption?.priceAdjustment || 0)) * duration * 100) / 100 - pointsToUse).toFixed(2) + '€' + ` (${mileage.label} + ${secondOption.label})`
                      :
                      product?.category === 'Boards' ?
                        (Math.round(product.price * duration * 100) / 100 - pointsToUse).toFixed(2) + '€' + ` (per day)`
                        :
                        (product.price - pointsToUse).toFixed(2) + '€'
                    }</Highlight>
                  </Price>
                </DetailsContainer>
              </>
            )}
          </ProductDetailsContainer>
        </ProductInfo>
      </Reservation>
    </>
  );
};

export default PaymentForm;