import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button'

const NavbarContainer = styled.nav`
  background: rgb(15,128,86);
  background: linear-gradient(90deg, rgba(15,128,86,1) 35%, rgba(1,50,32,1) 100%);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.a`
  text-decoration: none;
  color: #27a829;
  background-image: -webkit-linear-gradient(0deg, #ffffff 42%, #35b48b 5%, #011114 32%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-right: 1.5rem;
  position: relative;

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
  }

  &:last-child::after {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  transition: color 0.3s;
`;

const BurgerMenuButton = styled.button`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarContainer>
      <Logo href="#">CITYSPIRIT</Logo>
      <BurgerMenuButton onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </BurgerMenuButton>
      <Menu className={isMenuOpen ? 'open' : ''}>
        <MenuItem>
          <NavLink href="#">Home</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="#">About Us</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="#">Services</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="#">Pricing</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink href="#">Contact</NavLink>
        </MenuItem>
      </Menu>
      <Button>Get Started</Button>
    </NavbarContainer>
  );
};

export default Navbar;
