import styled from "styled-components";

export const FullScreenMapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Button = styled.button`
  display: block; 
  margin: auto; 
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

export const Price = styled.h3`
  display: block;
  margin: auto;
  padding-bottom: 1rem;
  text-align: center; 
`;

export const Date = styled.h3`
  display: block;
  margin: auto;
  text-align: center; 
`;

export const Location = styled.h3`
  display: block;
  margin: auto;
  text-align: center; 
`;