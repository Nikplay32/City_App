import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background-color: black;
  position: relative;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.a`
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

export const Menu = styled.ul<MenuProps>`
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
    z-index: 10000;
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

export const MenuItem = styled.li`
  margin-right: 1.5rem;
  position: relative;
  transition: color 0.3s; /* Add transition effect for hover */

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

  &:hover {
    color: #0099ff; /* Change color on hover */
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: white;
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }

  &:hover {
    color: #0056b3;
  }
`;

export const BurgerMenuButton = styled.button`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;
