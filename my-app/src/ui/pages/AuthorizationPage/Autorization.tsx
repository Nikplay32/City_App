import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { setDoc, doc, collection } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "../../atoms/GlobalStyles";
import Modal from 'react-modal';
import { toastMessages } from "../../toastmessages";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getDocs } from "firebase/firestore";
Modal.setAppElement('#root');

import {
  Container,
  FormContainer,
  Title,
  Paragraph,
  Form,
  Input,
  Button,
  BackButton,
  ModalContainer,
  ModalForm,
  ModalInput,
  ModalButton,
  SwitchButton,
  CloseButton,
  Overlay
} from './Autorization.styles';

const Authentication = () => {
  const { currentUser, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, [isRegister]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.emailVerified) {
        navigate('/profile');
      } else {
      }
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (isRegister) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (user) {
          await sendEmailVerification(user);
          toast.success("Verification email sent. Please check your inbox.");
  
          // Check if there are any users in the database
          const usersCollection = collection(db, "users");
          const userSnapshot = await getDocs(usersCollection);
          const isAdmin = userSnapshot.empty; // This will be true if there are no users
  
          await setDoc(doc(usersCollection, user.uid), { uid: user.uid, username: username, email: user.email, isVerified: user.emailVerified, isAdmin });
          setEmail(email);
        }
        toast.success(toastMessages.userRegistered);
      } catch (error: any) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error(toastMessages.emailAlreadyInUse);
            break;
          case 'auth/invalid-email':
            toast.error(toastMessages.invalidEmail);
            break;
          case 'auth/operation-not-allowed':
            toast.error(toastMessages.operationNotAllowed);
            break;
          case 'auth/weak-password':
            toast.error(toastMessages.weakPassword);
            break;
          default:
            toast.error(toastMessages.errorRegisteringUser);
            break;
        }
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        if (user) {
          await user.reload();
          if (user.emailVerified) {
            navigate('/profile');
          } else {
            toast.error("Please verify your email before logging in.");
          }
        }
      } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            toast.error(toastMessages.invalidEmail);
            break;
          case 'auth/user-disabled':
            toast.error(toastMessages.userDisabled);
            break;
          case 'auth/user-not-found':
            toast.error(toastMessages.userNotFound);
            break;
          case 'auth/wrong-password':
            toast.error(toastMessages.wrongPassword);
            break;
          default:
            toast.error(toastMessages.errorLoggingIn);
            break;
        }
      }
    }
  };

  const handlePasswordReset = async (event: React.FormEvent) => {
    event?.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent. Please check your inbox.");
      setModalIsOpen(false);
    } catch (error) {
      toast.error("Error sending password reset email.");
    }
  };

  return (
    <>
      <GlobalStyles></GlobalStyles>
      <ToastContainer />
      <Container>
        <BackButton to="/">Back to Home</BackButton>
        <FormContainer color={isRegister ? "black" : "white"}>
        <Title color={isRegister ? "black" : "white"}>{isRegister ? "Register" : "Log in"}</Title>
        <Paragraph color={isRegister ? "black" : "white"}>Welcome back! Please log in to your account.</Paragraph>
        <Form onSubmit={handleSubmit}>
            {isRegister && (
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">{isRegister ? "Register" : "Log in"}</Button>
            {!isRegister && (
            <Button type="button" onClick={() => setModalIsOpen(true)}>
              Forgot password?
            </Button>
          )}
          <SwitchButton type="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Switch to Log in" : "Switch to Register"}
          </SwitchButton>
          </Form>
        </FormContainer>
        <FormContainer color={isRegister ? "white" : "black"}>
          <Title color={isRegister ? "white" : "black"}>{isRegister ? "Welcome Back!" : "Join Us"}</Title>
          <Paragraph color={isRegister ? "white" : "black"}>
            {isRegister ? "Already have an account?" : "Not with us yet?"}
          </Paragraph>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Log in" : "Register"}
          </Button>
        </FormContainer>
      </Container>
      {modalIsOpen && <Overlay />}
      <ModalContainer overlayClassName="overlay" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <CloseButton onClick={() => setModalIsOpen(false)}>×</CloseButton>
        <h2>Reset Password</h2>
        <ModalForm onSubmit={handlePasswordReset}>
          <ModalInput
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <ModalButton type="submit">Send password reset email</ModalButton>
        </ModalForm>
      </ModalContainer>
    </>
  );
};

export default Authentication;