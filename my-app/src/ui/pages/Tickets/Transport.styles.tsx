import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  overflow: auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 10px; // Reduced padding for mobile
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 20%;
    border-right: 1px solid #ddd;
    border-bottom: none;
    padding: 20px; // Increased padding for desktop
  }
`;

export const MainContent = styled.div`
  width: 100%;
  padding: 10px; // Reduced padding for mobile
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 80%;
    padding: 20px; // Increased padding for desktop
  }
`;

export const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
  border-radius: 10px;
  overflow: hidden;
`;

export const TimeCell = styled.td`
  font-size: 14px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

export const TransportNavbar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #007BFF;
  padding: 15px 0;
  color: #fff;
  position: sticky;
  top: 0;
`;

export const TransportNavItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  color: #fff;
  animation: 1s ${fadeIn} ease-out;

  &:hover {
    color: #f8f8f8;
    transition: color 0.3s ease-in-out;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 14px; // Adjust this to change the size of the options
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
`;

export const Street = styled.p`
  cursor: pointer;
  &:hover {
    color: #007BFF;
  }
  padding: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #f8f8f8;
  }
`;

export const RouteTitle = styled.h2`
  margin-bottom: 20px;
  color: #007BFF;
`;

export const TableHead = styled.thead`
  background-color: #007BFF;
  color: #fff;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr``;

export const TableHeader = styled.th`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

export const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`