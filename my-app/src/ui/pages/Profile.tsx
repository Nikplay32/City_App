import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged, sendEmailVerification, reauthenticateWithCredential, EmailAuthProvider, updateEmail, reload } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessages } from '../toastmessages';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: 300px;
  margin-bottom: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Email = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const ModalContainer = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000000;
  padding: 50px;
  color: white;
  border-radius: 4px;
  outline: none;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
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
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [planStatus, setPlanStatus] = useState('Not Upgraded');

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

  return (
    
    <>
    <ToastContainer />
      <GlobalStyles></GlobalStyles>
      <Navbar />
      <ProfileContainer>
        <Title>Profile</Title>
        <Image src="https://source.unsplash.com/random" alt="Random Unsplash" />
        {isUserLoading ? (
          <p>Loading user data...</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
        <Email>Email: {email} <VerificationStatus isVerified={isEmailVerified}>{isEmailVerified ? "(Verified)" : "(Not Verified)"}</VerificationStatus></Email>
        <p>Plan: {planStatus}</p>
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
    </>
  );
}

export default Profile;