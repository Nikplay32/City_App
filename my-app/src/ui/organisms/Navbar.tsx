import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineMenu } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import Button from '../atoms/Button';
import {
  NavbarContainer,
  Logo,
  Menu,
  MenuItem,
  CloseButton,
  NavLink,
  BurgerMenuButton,
  DropdownMenu,
  DropdownMenuItem
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
  
        <DropdownMenu>
          <NavLink href="#">City Guide</NavLink> {/* Renamed from "Explore" */}
          <DropdownMenuItem>
            <MenuItem>
              <NavLink href="/sight">Sights & Landmarks</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink href="/map">City Map</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink href="/transport">Public Transport & Timetables</NavLink>
            </MenuItem>
          </DropdownMenuItem>
        </DropdownMenu>
        <MenuItem>
          <NavLink href="/chat">Live Agent Support</NavLink> {/* Renamed from "Chat with agents" */}
        </MenuItem>
        <DropdownMenu>
          <NavLink href="#">Local Services</NavLink> {/* Renamed from "Services" */}
          <DropdownMenuItem>
            <MenuItem>
              <NavLink href="/products">Transport Rentals</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink href="/activities">Activities & Events</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink href="/restaurants">Restaurants & Cafes</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink href="/salons">Beauty Salons</NavLink>
            </MenuItem>
          </DropdownMenuItem>
        </DropdownMenu>
        <MenuItem>
          <NavLink href="/subs">Premium Subscription</NavLink> {/* Renamed from "Subscription" */}
        </MenuItem>

  
        {currentUser.isAdmin && (
          <MenuItem>
            <NavLink href="/admin">Admin Dashboard</NavLink> {/* Renamed from "Dashboard" */}
          </MenuItem>
        )}
      </Menu>
      <Button onClick={handleButtonClick}>
        {currentUser.user ? 'Profile' : 'Get Started'}
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
