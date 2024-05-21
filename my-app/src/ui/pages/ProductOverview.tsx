
// ProductOverview.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import GlobalStyles from '../atoms/GlobalStyles';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer'
import Select from 'react-select';
import { components, OptionProps } from 'react-select';
import Map from '../organisms/Map'
import { toast, ToastContainer } from 'react-toastify';

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

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const OptionSelect = styled(Select)`
  // Add your styles here
`;

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


const ImageContainer = styled.div`
  flex: 1;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 15%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-weight: normal;
`;

const Price = styled.h2`
  color: #333;
  font-weight: normal;
`;

const Description = styled.div`
  border-top: 1px solid #e3dddd;
  margin: 2rem 0;
  padding: 1rem 0 0 0;
`;

const AddToCartButton = styled.button`
  background: #3e3e3f;
  color: #fff;
  border: none;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    background: #565657;
  }
`;

interface Product {
  title: string;
  images: string[];
  description: string;
  price: number;
  shortDescription: string;
  category: string;
}

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
`;

const PrevButton = styled(ArrowButton)`
  left: 0;
`;

const NextButton = styled(ArrowButton)`
  right: 0;
`;

const TechData = styled.div`
  border-top: 1px solid #e3dddd;
  margin: 2rem 0;
  padding: 1rem 1rem;
`;

const TechDataTitle = styled.h2`
  text-align: center;
  padding: 2rem;
`;

const TechDataTable = styled.table`
  width: 100%;
  padding: 1rem;
  border-collapse: collapse;
`;

const TechDataRow = styled.tr`
  border-bottom: 1px solid #e3dddd;
  &:last-child {
    border-bottom: none;
  }
`;

const TechDataCell = styled.td`
  border-right: 1px solid #e3dddd;
  padding: 0.5rem;
  &:last-child {
    border-right: none;
  }
`;

const TechDataHeader = styled.th`
  // Add your styles here
`;

const BookingOption = styled.div`
  border-top: 1px solid #e3dddd;
  padding: 1rem 0;
`;

const BookingOptionTitle = styled.h3`
  // Add your styles here
`;

const BookingOptionDescription = styled.p`
  // Add your styles here
`;

const PriceDetails = styled.div`
  border-top: 1px solid #e3dddd;
  padding: 1rem 0;
`;

const PriceDetailsTitle = styled.h3`
  // Add your styles here
`;

const PriceDetailsDescription = styled.p`
  // Add your styles here
`;

interface RouteParams {
  id: string;
}

const ProductOverview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(1);
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handlePrevImage = () => {
    if (product) {
      setActiveImageIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : product.images.length - 1));
    }
  };

  const handleNextImage = () => {
    if (product) {
      setActiveImageIndex((prevIndex) => (prevIndex < product.images.length - 1 ? prevIndex + 1 : 1));
    }
  };

  const handleAddToCart = () => {
    if (isSubscribed) {
      if (id) {
        // Add the product to the cart here
        localStorage.setItem('selectedProduct', id);
        // Navigate to the payment page
        navigate('/reservation');
      } else {
        console.error('Product ID is undefined');
      }
    } else {
      toast.error('Only subscribed users can rent premium class products. Please subscribe to continue.');
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
        <BookingOption>
        <BookingOptionTitle>Booking option</BookingOptionTitle>
        <OptionSelect
        options={bookingOptions}
        components={{
            Option: Option,
        }}
        />
        </BookingOption>
        <PriceDetails>
        <PriceDetailsTitle>Mileage</PriceDetailsTitle>
        <OptionSelect 
        options={mileageOptions} 
        components={{
            Option: Option,
        }}
        />
        </PriceDetails>
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