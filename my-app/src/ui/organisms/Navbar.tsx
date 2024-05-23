import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button'
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineMenu } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import { 
  NavbarContainer, 
  Logo, 
  Menu, 
  MenuItem, 
  CloseButton, 
  NavLink,
  BurgerMenuButton 
} from './Navbar.styles';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = () => {
    if (currentUser.user) {
      navigate('/profile');
    } else {
      navigate('/authorization');
    }
  };
  

  return (
    <NavbarContainer>
      <Logo href="/">CITYSPIRIT</Logo>
      <BurgerMenuButton onClick={toggleMenu}>
        <MdOutlineMenu size={24} color="black" />
      </BurgerMenuButton>
      <Menu open={isMenuOpen}>
        <CloseButton onClick={toggleMenu}>
          <FaTimes size={24} color="white" />
        </CloseButton>
        <MenuItem>
          <NavLink href="/">Home</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="/products">Products</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="/activities">Activities</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="/Map">Map</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="/transport">Timetable</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="/subs">Subscription</NavLink>
        </MenuItem>
      </Menu>
      <Button onClick={handleButtonClick}>
        {currentUser.user ? 'Profile' : 'Get Started'}
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
