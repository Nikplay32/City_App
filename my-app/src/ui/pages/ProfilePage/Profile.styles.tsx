import styled from "styled-components";
import Modal from 'react-modal';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`;

export const ProfileContainer = styled.div`
  width: 45%;
  margin: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px;
    padding: 15px;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }
`;

export const Email = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 8px;
  }
`;

export const ModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #000000;
  border-radius: 10px;
`;

export const ModalInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 15px;
    margin: 8px;
  }
`;

export const ReservationsContainer = styled.div`
  width: 45%;
  margin: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px;
    padding: 15px;
  }
`;

export const Reservation = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;

  .reservation-image {
    width: 350px;
    height: 250px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 15px;

    .reservation-image {
      width: 80%; 
      height: auto; 
    }
  }
`;

export const ReservationInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ReservationButton = styled.button`
  padding: 10px 20px;
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

export const PlanStatus = styled.p<{ status: string }>`
  color: ${props => {
    switch (props.status) {
      case 'Upgraded':
        return 'green';
      case 'Not Upgraded':
        return 'red';
      default:
        return 'black';
    }
  }};
`;

export const LoyaltyPoints = styled.p`
  color: #ff8c00; /* Change to the color you want */
  /* Add other styles as needed */
`;

export const PlanText = styled.p`
  color: black;
`;
export const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Align items vertically */
`;

interface VerificationStatusProps {
  isVerified: boolean;
}

export const VerificationStatus = styled.span<VerificationStatusProps>`
  color: ${props => props.isVerified ? 'green' : 'red'};
`;