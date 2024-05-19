import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button'
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineMenu } from "react-icons/md";

const NavbarContainer = styled.nav`
  background-color: black;
  position: relative;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.a`
  text-decoration: none;
  color: #000000;
  background-image: -webkit-linear-gradient(0deg, #ffffff 42%, #35b48b 5%, #09d8ff 32%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    display: block; // This will hide the logo in the mobile view
  }
`;


interface MenuProps {
  open: boolean;
}

const Menu = styled.ul<MenuProps>`
  z-index: 1;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background-color: black;
    transform: translateX(${props => (props.open ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
  }
`;

const MenuItem = styled.li`
  margin-right: 1.5rem;
  position: relative;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  &:last-child {
    margin-right: 0;
  }

  &::after {
    content: "|";
    position: absolute;
    color: white;
    top: 50%;
    right: -0.75rem;
    transform: translateY(-50%);
    @media (max-width: 768px) {
      content: none;
    }
  }

  &:last-child::after {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  transition: color 0.3s;
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }

  &:hover {
    color: #0056b3;
  }
`;

const BurgerMenuButton = styled.button`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStartedClick = () => {
    navigate('/authorization');
  };

  return (
    <NavbarContainer>
      <Logo href="#">CITYSPIRIT</Logo>
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
          <NavLink href="/subs">Subscription</NavLink>
        </MenuItem>
      </Menu>
      <Button onClick={handleGetStartedClick}>Get Started</Button>
    </NavbarContainer>
  );
};

export default Navbar;
