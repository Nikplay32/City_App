// Navbar.tsx
import React from 'react';
import styled from 'styled-components';

// Define styled components for your navbar elements
const NavbarWrapper = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
`;

const NavList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  display: inline;
  margin-right: 10px;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Define your Navbar component
const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <NavList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        {/* Add more navigation items as needed */}
      </NavList>
    </NavbarWrapper>
  );
};

export default Navbar;
