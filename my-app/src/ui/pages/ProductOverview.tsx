import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase'; // adjust the path as necessary
import { doc, getDoc, collection, getDocs,  } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import GlobalStyles from '../atoms/GlobalStyles';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import Select from 'react-select';
import { components, OptionProps } from 'react-select';
import Map from '../organisms/Map';
import {
  ProductContainer,
  OptionSelect,
  ImageContainer,
  Image,
  ArrowButton,
  PrevButton,
  NextButton,
  InfoContainer,
  Title,
  Price,
  Description,
  AddToCartButton,
  TechData,
  TechDataTitle,
  TechDataTable,
  TechDataRow,
  TechDataCell,
  TechDataHeader,
  BookingOption,
  BookingOptionTitle,
  BookingOptionDescription,
  PriceDetails,
  PriceDetailsTitle,
  PriceDetailsDescription
} from './ProductOverview.styles';


interface Product {
  id: string;
  title: string;
  images: string[];
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  specifications: string[];
  subscribers_only: string;
}

const Option = (props: OptionProps<any, false>) => {
  const { data, isSelected, isFocused } = props;
  const color = isSelected || isFocused ? '#000000' : '#000';
  const descriptionColor = isSelected || isFocused ? '#000000' : '#888';

  return (
    <components.Option {...props}>
      <div>
        <strong style={{ color }}>{data.label}</strong>
        <p style={{ fontSize: '12px', color: descriptionColor }}>{data.description}</p>
      </div>
    </components.Option>
  );
};

const bookingOptions = [
  { value: 'best_price', label: 'Best price', description: 'Pay now, cancel and rebook for a fee' },
  { value: 'stay_flexible', label: 'Stay flexible', description: 'Pay at pick-up, free cancellation and rebooking anytime' },
  // Add more options as needed
];

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

type RouteParams = {
  id: string;
};

const ProductOverview: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(1);
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false); // Changed initial state to false

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productDoc = doc(db, 'products', id);
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
  }, [id]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const paymentsCol = collection(db, 'payments'); // Assuming you have a 'payments' collection
        const paymentSnapshot = await getDocs(paymentsCol);
        const userPayment = paymentSnapshot.docs.find(doc => doc.data().userId === userId);

        if (userPayment && userPayment.data().status === 'success') {
          setIsSubscribed(true);
        }
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const handlePrevImage = () => {
    if (product) {
      setActiveImageIndex(prevIndex => (prevIndex > 1 ? prevIndex - 1 : product.images.length - 1));
    }
  };

  const handleNextImage = () => {
    if (product) {
      setActiveImageIndex(prevIndex => (prevIndex < product.images.length - 1 ? prevIndex + 1 : 1));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (product.subscribers_only === 'true' && !isSubscribed) {
        toast.error('Only subscribed users can rent premium class products. Please subscribe to continue.');
      } else {
        if (id) {
          localStorage.setItem('selectedProduct', id);
          navigate('/reservation');
        } else {
          console.error('Product ID is undefined');
        }
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <ToastContainer></ToastContainer>
      <GlobalStyles/>
      <Navbar/>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.images[activeImageIndex]} alt={`${product.title} ${activeImageIndex + 1}`} />
          <PrevButton onClick={handlePrevImage}>Prev</PrevButton>
          <NextButton onClick={handleNextImage}>Next</NextButton>
        </ImageContainer>
        <InfoContainer>
        <Title>{product.title}</Title>
        <Price>${product.price}</Price>
        <Description>
            <p>{product.description}</p>
        </Description>
        <AddToCartButton onClick={handleAddToCart}>Rent now</AddToCartButton>
        </InfoContainer>
      </ProductContainer>
      <TechData>
        <TechDataTitle>Technical Specification & Data</TechDataTitle>
        <Description>
            <p>{product.description}</p>
        </Description>
        <TechDataTable>
            <TechDataRow>
            <TechDataCell>Specification 1</TechDataCell>
            <TechDataCell>Value 1</TechDataCell>
            </TechDataRow>
            <TechDataRow>
            <TechDataCell>Specification 2</TechDataCell>
            <TechDataCell>Value 2</TechDataCell>
            </TechDataRow>
            {/* Add more rows as needed */}
        </TechDataTable>
      </TechData>
      <Map iconUrl={'https://cdn-icons-png.flaticon.com/256/75/75782.png'} />
      <Footer/>
    </>
  );
};

export default ProductOverview;