import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  width: 20%;
  border-right: 1px solid #ddd;
  padding: 10px;
`;

export const MainContent = styled.div`
  width: 80%;
  padding: 10px;
`;

export const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TimeCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const TransportNavbar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f8f8f8;
  padding: 10px 0;
`;

export const TransportNavItem = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  color: #333;
  &:hover {
    color: #007BFF;
  }
`;