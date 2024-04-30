import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import GlobalStyles from '../atoms/GlobalStyles';

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  background: linear-gradient(45deg, #fff 50%, green 50%);
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
  color: ${props => props.color || '#ffffff'};
`;

const Paragraph = styled.p`
  color: ${props => props.color || '#ffffff'};
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
  const navigate = useNavigate();

  const auth = getFirebaseAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegister) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered');
        setIsRegister(false);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        navigate('/rental');
        console.log('User logged in');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <BackButton to="/">Back to Home</BackButton>
        <FormContainer color={isRegister ? 'white' : 'black'}>
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
        <FormContainer color={isRegister ? 'black' : 'white'}>
        <Title color={isRegister ? 'black' : 'black'}>{isRegister ? 'Register' : 'Log in'}</Title>
          <Paragraph color={isRegister ? 'black' : 'black'}>{isRegister ? 'Already have an account?' : 'Not with us yet?'}</Paragraph>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Log in' : 'Register'}
          </Button>
        </FormContainer>
      </Container>
    </>
  );
};

export default Authentication;