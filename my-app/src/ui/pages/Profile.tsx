import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider, updateEmail, reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import GlobalStyles from '../atoms/GlobalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessages } from '../toastmessages';
import { deleteDoc, collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;
`;

const ProfileContainer = styled.div`
  width: 45%; // adjust as needed
  margin: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ModalContainer = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const ModalInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ReservationsContainer = styled.div`
  width: 45%; // adjust as needed
  margin-top: 40px;
  margin: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
`;

const Reservation = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReservationInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ReservationButton = styled.button`
  padding: 10px 20px;
  background-color: #ff5252;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface VerificationStatusProps {
  isVerified: boolean;
}

const VerificationStatus = styled.span<VerificationStatusProps>`
  color: ${props => props.isVerified ? 'green' : 'red'};
`;


const Profile = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [reservations, setReservations] = useState<any[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [planStatus, setPlanStatus] = useState('Not Upgraded');
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);

  const handleUpgradePlan = () => {
    navigate('/subs');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email || '');
        setIsEmailVerified(user.emailVerified);

        // Fetch the user's payment status
        const paymentsQuery = query(collection(db, 'payments'), where('userId', '==', user.uid));
        const paymentsSnapshot = await getDocs(paymentsQuery);
        paymentsSnapshot.forEach((doc) => {
          if (doc.data().status === 'success') {
            setPlanStatus('Upgraded');
          }
        });

        // Fetch the user's reservations
        const reservationsQuery = query(collection(db, 'reservations'), where('userId', '==', user.uid));
        const reservationsSnapshot = await getDocs(reservationsQuery);
        const reservationsData = await Promise.all(reservationsSnapshot.docs.map(async docSnapshot => {
          const reservation = docSnapshot.data();
          // Fetch the product data for this reservation
          const productDocRef = doc(db, 'products', reservation.productId);
          const productSnapshot = await getDoc(productDocRef);
          const productData = productSnapshot.data();
          // Check if the product data is undefined
          if (!productData) {
            console.error(`Product with ID ${reservation.productId} not found.`);
            return null;
          }
          // Return the reservation data and the associated product data
          return { id: docSnapshot.id, ...reservation, product: productData };
        }));
        // Filter out any null values
        setReservations(reservationsData.filter(reservation => reservation !== null));
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData && userData.loyalty_points) {
            // Update the loyalty points balance state
            setLoyaltyPoints(userData.loyalty_points);
          }
        }
      } else {
        navigate('/authorization');
      }
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);


  const handleChangeEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!auth.currentUser) {
      toast.error(toastMessages.userNotFound);
      return;
    }

    if (!password) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!newEmail) {
      toast.error("Please enter your new email.");
      return;
    }

    try {
      // Re-authenticate the user
      setIsLoading(true);
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update the email in Firebase Authentication
      await updateEmail(auth.currentUser, newEmail);

      // Send a verification email to the new email
      await sendEmailVerification(auth.currentUser);
      await reload(auth.currentUser);
      setIsEmailVerified(auth.currentUser.emailVerified);

      // Close the modal
      setIsModalOpen(false);

      // Show a success toast notification
      toast.success("Email updated successfully. Please verify your email now and relogin.");
      toast.success("Please verify your email now and relogin.");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error updating email', error);

      // Show an error toast notification based on the error code
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error(toastMessages.invalidEmail);
          break;
        case 'auth/email-already-in-use':
          toast.error(toastMessages.emailAlreadyInUse);
          break;
        case 'auth/requires-recent-login':
          toast.error(toastMessages.requiresRecentLogin);
          break;
        case 'auth/wrong-password':
          toast.error(toastMessages.wrongPassword);
          break;
        case 'auth/user-disabled':
          toast.error(toastMessages.userDisabled);
          break;
        case 'auth/user-not-found':
          toast.error(toastMessages.userNotFound);
          break;
        default:
          toast.error("Email not updated. Please try again later");
      }
    }
  };


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/authorization")
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await deleteDoc(doc(db, 'reservations', reservationId));
      toast.success('Reservation cancelled successfully.');
      // Remove the cancelled reservation from the reservations state
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
    } catch (error) {
      console.error('Error cancelling reservation', error);
      toast.error('Failed to cancel reservation. Please try again later.');
    }
  };

  return (

    <>
      <ToastContainer />
      <GlobalStyles></GlobalStyles>
      <Navbar />
      <MainContainer>
        <ProfileContainer>
          <Title>Profile</Title>
          <Image src="https://source.unsplash.com/random" alt="Random Unsplash" />
          <Subtitle>Contact Information</Subtitle>
          {isUserLoading ? (
            <p>Loading user data...</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Email>Email: {email} <VerificationStatus isVerified={isEmailVerified}>{isEmailVerified ? "(Verified)" : "(Not Verified)"}</VerificationStatus></Email>
              <p>Plan: {planStatus}</p>
              <p>Loyalty Points: {loyaltyPoints}</p>
              <Button onClick={() => setIsModalOpen(true)}>Change Email</Button>
              <Button onClick={handleUpgradePlan}>Upgrade Plan</Button>
            </>
          )}
          <ModalContainer isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <h2>Change Email</h2>
            <ModalForm onSubmit={handleChangeEmail}>
              <ModalInput
                type="email"
                value={email}
                readOnly
                placeholder="Current email"
              />
              <ModalInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <ModalInput
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="New email"
              />
              <ModalButton type="submit">Change Email</ModalButton>
            </ModalForm>
          </ModalContainer>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </ProfileContainer>
        <ReservationsContainer>
          <Title>Your reservations</Title>
          {reservations.map((reservation, index) => {
            // Calculate the time difference in minutes
            let timeDifference = Infinity; // Initialize to Infinity
            if (reservation.reservationTime) {
              const reservationTime = reservation.reservationTime.toDate(); // Convert Firestore Timestamp to JavaScript Date
              const currentTime = new Date();
              timeDifference = (currentTime.getTime() - reservationTime.getTime()) / (1000 * 60);
            }

            return (
              <Reservation key={index}>
                <p>Product Name: {reservation.product.title}</p>
                <img src={reservation.product.images[0]} alt="" style={{ width: '350px', height: '250px' }} />
                <p>Price: €{reservation.totalPrice}</p>
                <p>Mileage: {reservation.mileage}</p>
                <p>ID: {reservation.productId}</p>
                <p>Reservation Time: {reservation.reservationTime ? reservation.reservationTime.toDate().toLocaleString() : 'N/A'}</p>
                <p>Second Option: {reservation.secondOption}</p>
                {timeDifference < 5 && <Button onClick={() => handleCancelReservation(reservation.id)}>Cancel Reservation</Button>}
              </Reservation>
            );
          })}
        </ReservationsContainer>
      </MainContainer>
      <Footer></Footer>
    </>
  );
}

export default Profile;