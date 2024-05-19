import React, { useState } from 'react';
import styled from 'styled-components';
import { RiIdCardLine } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { AiFillLock } from 'react-icons/ai';

const FormContainer = styled.div`
  max-width: 400px;
  font-family: 'Nunito', sans-serif;
  margin: 0 auto;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const CardContainer = styled.div`
  perspective: 1000px;
  margin-bottom: 2rem;
  border-radius: 10px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  height: 250px;
  background-color: #0056b3;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

const CardChip = styled.img`
  width: 70px;
  height: 60px;
  position: absolute;
  bottom: 50%;
  left: 20px;
`;

const BankName = styled.div`
  width: 50px;
  height: 60px;
  position: absolute;
  top: 10px;
  right: 80px;
`;

const FrontFace = styled(CardFace)`
  background: repeating-linear-gradient(45deg, #00b8ff, transparent 100px);
  background-blend-mode: multiply;
  color: #fff;
  border-radius: 10px;
`;

const BackFace = styled(CardFace)`
  background: linear-gradient(45deg, #00b8ff, transparent 200px), linear-gradient(226deg, #00b8ff, transparent 200px);
  color: #000;
  transform: rotateY(180deg);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
`;

const MagneticStripe = styled.div`
  width: calc(100% + 40px); // Add the left and right padding of the BackFace component
  height: 4rem;
  background-color: #000;
  margin-left: -20px; // Counteract the left padding of the BackFace component
  margin-right: -20px; // Counteract the right padding of the BackFace component
`;

const MagneticStripeText = styled.div`
  color: #000000;
  font-size: 0.8rem;
`;

const SignatureStrip = styled.div`
  position: relative;
  width: 70%;
  height: 40px;
  right: 4rem;
  background-color: #ddd;// Add some margin to separate the stripe from the magnetic strip
`;

const CVVLabel = styled.span`
  position: absolute;
  top: 5px;
  right: 20px;
  color: #000;
  font-size: 0.8rem;
`;

const CVV = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #000;
  font-size: 1rem;
`;

const CardIssuerInfo = styled.div`
  color: #000;
  font-size: 0.8rem;
`;

const SecurityFeatures = styled.div`
  color: #000;
  font-size: 0.8rem;
`;

const CardBrandLogo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  font-size: 0.8rem;
  width: 50%;

  img {
    width: auto;
    height: 40px;
  }
`;

const CardholderAgreementInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: #000;
  font-size: 0.8rem;
  width: 50%;
  text-align: right;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem 1.5rem 0.5rem 2.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  background-color: #f8f9fa;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CardNumber = styled.span`
  color: white;
  font-size: 1.5rem;
  position: absolute;
  bottom: 55px;
  left: 20px;
`;

const CardHolder = styled.span`
  color: white;
  font-size: 1rem;
  position: absolute;
  bottom: 25px;
  left: 20px;
`;

const Expiry = styled.span`
  color: white;
  font-size: 1rem;
  position: absolute;
  bottom: 60px;
  right: 20px;
`;

const VisaChip = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BankLogo = styled.img`
  width: auto;
  height: 60px;
  position: absolute;
  bottom: 5px;
  right: 20px;
`;

const NFCIcon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 30%;
  left: 100px; // Adjust this value to position the NFC icon correctly
`;

const PaymentForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardNumberChange = (value: string) => {
    // Remove all non-digit characters and add a space after every 4 digits
    const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ');
  
    setCardNumber(formattedValue);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <FormContainer>
      <CardContainer>
        <Card onClick={flipCard} style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <FrontFace>
        <BankName>Luminor</BankName>
        <CardChip src="https://cdn-icons-png.freepik.com/512/6404/6404100.png" alt="Card Chip" />
        <NFCIcon src="https://icons.veryicon.com/png/o/object/material-design-icons-1/nfc-2.png" alt="NFC Icon" />
        <CardNumber>{cardNumber || '0000 0000 0000 0000'}</CardNumber>
        <CardHolder>{'CARDHOLDER NAME'}</CardHolder>
        <Expiry>{expiry || 'MM/YY'}</Expiry>
        <BankLogo src="https://cdn.icon-icons.com/icons2/3261/PNG/512/visa_logo_icon_206647.png" alt="Bank Logo" />
        </FrontFace>
          <BackFace>
            <MagneticStripeText>This is the magnetic stripe text. This is the magnetic stripe.</MagneticStripeText>
            <MagneticStripe />
            <SignatureStrip>
                <CVVLabel>CVV</CVVLabel>
                <CVV>{cvv || '###'}</CVV>
            </SignatureStrip>
            <CardIssuerInfo>Issuer Info</CardIssuerInfo>
            <SecurityFeatures>Security Features</SecurityFeatures>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardBrandLogo>
            <img src="https://icon-library.com/images/credit-icon/credit-icon-7.jpg" alt="Visa Logo" />
            </CardBrandLogo>
                <CardholderAgreementInfo>Cardholder Agreement Info</CardholderAgreementInfo>
            </div>
            </BackFace>
        </Card>
      </CardContainer>
      <Form>
        <InputContainer>
          <InputIcon>
            <RiIdCardLine />
          </InputIcon>
          <Input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputIcon>
            <IoMdCalendar />
          </InputIcon>
          <Input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <InputIcon>
            <AiFillLock />
          </InputIcon>
          <Input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </InputContainer>
        <Button type="submit">Pay Now</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentForm;
