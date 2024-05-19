import styled from "styled-components";

export const CardContainer = styled.div`
  perspective: 1000px;
  margin-bottom: 2rem;
  border-radius: 10px;
`;

export const Card = styled.div`
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

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export const CardChip = styled.img`
  width: 70px;
  height: 60px;
  position: absolute;
  bottom: 50%;
  left: 20px;
`;

export const BankName = styled.img`
  width: auto;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 20px;
`;

export const FrontFace = styled(CardFace)<{ cardtype: string }>`
  background: ${({ cardtype }) =>
    cardtype === 'visa' ? 'linear-gradient(45deg, #7505dd, #9c67ea)' :
    cardtype === 'mastercard' ? 'linear-gradient(45deg, #f1710f, #ffe10a)' :
    cardtype === 'maestro' ? 'repeating-linear-gradient(45deg, green, #28ca5c 100px)' :
    'repeating-linear-gradient(45deg, #00b8ff, transparent 100px)'};
  background-blend-mode: multiply;
  color: #fff;
  border-radius: 10px;
`;


export const BackFace = styled(CardFace)<{ cardtype: string }>`
  background: ${({ cardtype }) =>
    cardtype === 'visa' ? 'linear-gradient(45deg, #7505dd, #9c67ea)' :
    cardtype === 'mastercard' ? 'linear-gradient(45deg, #f1710f, #ffe10a)' :
    cardtype === 'maestro' ? 'repeating-linear-gradient(45deg, green, #28ca5c 100px)' :
    'repeating-linear-gradient(45deg, #00b8ff, transparent 100px)'};
  color: #000;
  transform: rotateY(180deg);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
`;

export const MagneticStripe = styled.div`
  width: calc(100% + 40px); // Add the left and right padding of the BackFace component
  height: 4rem;
  background-color: #000;
  margin-left: -20px; // Counteract the left padding of the BackFace component
  margin-right: -20px; // Counteract the right padding of the BackFace component
`;

export const MagneticStripeText = styled.div`
  color: #000000;
  font-size: 0.8rem;
`;

export const SignatureStrip = styled.div`
  position: relative;
  width: 70%;
  height: 40px;
  right: 4rem;
  background-color: #ddd;// Add some margin to separate the stripe from the magnetic strip
`;

export const CVVLabel = styled.span`
  position: absolute;
  top: 5px;
  right: 20px;
  color: #000;
  font-size: 0.8rem;
`;

export const CVV = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #000;
  font-size: 1rem;
`;

export const CardIssuerInfo = styled.div`
  color: #000;
  font-size: 0.8rem;
`;

export const SecurityFeatures = styled.div`
  color: #000;
  font-size: 0.8rem;
`;

export const CardBrandLogo = styled.div`
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

export const CardholderAgreementInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: #000;
  font-size: 0.8rem;
  width: 50%;
  text-align: right;
`;




export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  color: #333;
`;

export const Input = styled.input`
  width: 80%;
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

export const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-items: center;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CardNumber = styled.span`
  color: white;
  font-size: 1.5rem;
  position: absolute;
  bottom: 55px;
  left: 20px;
  @media (max-width: 768px) {
    font-size: 1rem;
    bottom: 70px;
  }
`;

export const CardHolder = styled.span`
  color: white;
  font-size: 1rem;
  position: absolute;
  bottom: 25px;
  left: 20px;
`;

export const Expiry = styled.span`
  color: white;
  font-size: 1rem;
  position: absolute;
  bottom: 60px;
  right: 20px;
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

export const VisaChip = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BankLogo = styled.img`
  width: auto;
  height: 60px;
  position: absolute;
  bottom: 5px;
  right: 20px;
`;

export const NFCIcon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 30%;
  left: 100px; // Adjust this value to position the NFC icon correctly
`;

export const Reservation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  max-width: 50vw;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  img {
    max-width: 600px;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
  }

  h2 {
    font-size: 4rem;
    font-weight: 800;
    color: #333;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1%.5;
    font-weight: 800;
    color: #333;
    margin-top: 30px;
  }

  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
    padding: 0rem 2rem;
    text-align: justify;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    img {
      max-width: 200px;
    }
  }
`;

export const Form = styled.form`
  max-width: 400px;
  width: 100%;
  margin-right: 20px;
  font-family: 'Nunito', sans-serif;
  margin: 0 auto;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  flex: 1;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-right: 0;
    max-width: 100%;
    order: 2;
  }
`;