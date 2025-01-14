import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000000;
  padding: 20px; 
  color: white;
  border-radius: 4px;
  outline: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px; 
  width: 90%;
  max-height: 90vh; 
  overflow-y: auto; 

  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
    width: 100%; 
    max-height: 80vh;
  }
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 100%; 
`;

export const StyledForm = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  text-align: center;
`;


export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  appearance: none;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media (max-width: 768px) {
    overflow-x: auto; 
    width: 50%;
    display: block; 
  }
`;

export const AdminNote = styled.p`
  color: red;
  padding-top: 1rem;
  font-weight: bold;
`;

export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const StyledText = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`;

export const StyledButton = styled.a`
  --color: ${props => props.color || "#1e9bff"};
  position: relative;
  padding: 8px 10px;
  font-size: 12px;
  color: var(--color);
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.5s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    color: #000000;
    border: 2px solid rgba(0, 0, 0, 0);
    box-shadow: 0 0 0px var(--color);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color);
    transform: scale(0);
    transition: 0.5s;
  }

  &::before {
    transform-origin: top;
  }

  &::after {
    transform-origin: bottom;
  }

  &:hover::before,
  &:hover::after {
    transform: scale(1);
    transition-delay: 0.5s;
    box-shadow: 0 0 5px var(--color),
      0 0 7px var(--color),
      0 0 9px var(--color);
  }

  span {
    position: absolute;
    background: var(--color);
    pointer-events: none;
    border-radius: 2px;
    box-shadow: 0 0 5px var(--color),
      0 0 20px var(--color),
      0 0 30px var(--color),
      0 0 50px var(--color),
      0 0 100px var(--color);
    transition: 0.5s ease-in-out;
    transition-delay: 0.25s;
  }

  &:hover span {
    opacity: 0;
    transition-delay: 0s;
  }

`;

export const TableCell = styled.td`
  border: 1px solid #dddddd; 
  padding: 8px;
  word-break: break-word; 
`;

export const TableHeader = styled.th`
  border: 1px solid #dddddd; 
  padding: 8px;
  text-align: left;
  background-color: #ffffff;
`;

export const TableRow = styled.tr`
  background-color: #ffffff; 
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff; 
  color: #ffffff; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; 
  }
`;

export const ButtonSave = styled.button`
  padding: 8px 16px;
  background-color: #007bff; 
  color: #ffffff; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; 
  }
`;

export const ButtonCancel = styled.button`
  padding: 8px 16px;
  background-color: #007bff; 
  color: #ffffff; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; 
  }
`;

export const Popup = styled.div`
`;

export const DashboardContainer = styled.div`
  display: flex;
  height: 200vh;
`;

export const SideNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px; 
  @media (max-width: 768px) {
    width: 100%; 
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  text-align: center;
  background: url('${process.env.PUBLIC_URL}/riga.jpg') no-repeat center center/cover;
  @media (max-width: 768px) {
    padding: 10px; 
  }
`;

export const NavItem = styled.div`
`;

export const Logo = styled.a`
  text-decoration: none;
  align-items: center;
  color: #000000;
  background-image: -webkit-linear-gradient(0deg, #ffffff 42%, #35b48b 5%, #09d8ff 32%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
  
`;

export const SearchBar = styled.input.attrs({ type: 'search' })`
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-right: 40px;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
        color: #aaa;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        display: none;
    }
`;

export const SearchIcon = styled(FaSearch)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9c9c9c;
`;

export const CloseIcon = styled(FaTimes)`
    position: absolute;
    right: 10px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%);
    color: #9c9c9c;
`;

export const SearchBarContainer = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

export const SidebarLink = styled.a`
  text-decoration: none;
  color: #D1D5DB;
  transition: color 0.3s;
  display: block;
  padding: 0.625rem;
  border-radius: 0.5rem;
  margin-top: 1.5rem;

  &:hover {
    color: #2563EB;
    background-color: #374151;
  }
`;

export const SidebarContainer = styled.div`
  height: auto;
  padding: 2rem;
  width: 300px;
  overflow-y: auto;
  text-align: center;
  background-color: #000000;

  ${Logo} {
    margin-bottom: 2rem;
  }
`;

export const SidebarHeader = styled.div`
  color: #D1D5DB;
  font-size: 1rem;
  padding: 0.625rem 0;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SidebarSearch = styled.div`
  padding: 0.625rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  background-color: #374151;
  color: #FFFFFF;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #2563EB;
  }
`;

export const SidebarItem = styled.div`
  padding: 0.625rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  color: #FFFFFF;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #2563EB;
  }
`;

export const SidebarDivider = styled.div`
  margin: 1rem 0;
  height: 1px;
  background-color: #374151;
`;

export const SidebarSubmenu = styled.div`
  text-align: left;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: #D1D5DB;
  font-weight: bold;
`;

export const SidebarSubmenuItem = styled.h1`
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2563EB;
  }
`;
