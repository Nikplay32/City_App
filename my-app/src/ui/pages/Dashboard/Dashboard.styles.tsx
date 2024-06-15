import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1e1e1e;
  padding: 20px;
  color: #ffffff;
  border-radius: 8px;
  outline: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 80vh;
  }
`;

export const ArrayItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ArrayButton = styled.button`
  padding: 5px 10px;
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

export const StyledInput = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #555555;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  background-color: #333333;
  color: #ffffff;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #007bff;
    outline: none;
  }
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
  background: white;
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
  width: 200px;
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

export const Data = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-top: 40px;
  max-width: 400px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h2`
  margin: 0;
  margin-bottom: 10px;
`;

export const CardContent = styled.div`
  margin-bottom: 10px;
`;

export const ActionButton = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
