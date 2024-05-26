import styled from "styled-components";

export const FullScreenMapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  display: block; /* Add this line */
  margin: auto; /* Add this line */
  padding: 8px 16px;
  background-color: #007bff; /* Change this to your desired button color */
  color: #ffffff; /* Change this to your desired text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Change this to your desired button hover color */
  }
`;

export const Price = styled.h3`
  display: block;
  margin: auto;
  padding-bottom: 1rem;
  text-align: center; // Add this line to center the text
`;

export const Date = styled.h3`
  display: block;
  margin: auto;
  text-align: center; // Add this line to center the text
`;

export const Location = styled.h3`
  display: block;
  margin: auto;
  text-align: center; // Add this line to center the text
`;