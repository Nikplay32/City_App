import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from '../../firebase';

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  transition: all 0.5s ease;
  padding: 50px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #333;
`;

const Paragraph = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const auth = getFirebaseAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegister) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User logged in');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <>
      <Container>
        <BackButton to="/">Back to Home</BackButton>
        <FormContainer color={isRegister ? 'lightgray' : 'white'}>
          <Title>{isRegister ? 'Register' : 'Log in'}</Title>
          <Paragraph>Welcome back! Please log in to your account.</Paragraph>
          <Form onSubmit={handleSubmit}>
            <Input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
            {isRegister && (
              <Input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            )}
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <Button type="submit">{isRegister ? 'Register' : 'Log in'}</Button>
          </Form>
        </FormContainer>
        <FormContainer color={isRegister ? 'white' : 'lightgray'}>
          <Title>{isRegister ? 'Welcome Back!' : 'Join Us'}</Title>
          <Paragraph>{isRegister ? 'Already have an account?' : 'Not with us yet?'}</Paragraph>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Log in' : 'Register'}
          </Button>
        </FormContainer>
      </Container>
    </>
  );
};

export default Authentication;