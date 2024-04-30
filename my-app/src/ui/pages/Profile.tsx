import React, { useState } from 'react';
import Navbar from "../organisms/Navbar";
import GlobalStyles from "../atoms/GlobalStyles";
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
`;

const Button = styled.button`
  margin: 10px 0;
`;

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <ProfileContainer>
        <h1>Profile</h1>
        <Input type="email" value={email} placeholder="Change email" />
        <Input type="password" value={password} placeholder="Change password" />
        <Button>Update</Button>
        <h2>Reserved Actions</h2>
        {/* Render the list of reserved actions here */}
        <h2>Rentals</h2>
        {/* Render the list of rentals here */}
      </ProfileContainer>
    </>
  );
}

export default Profile;