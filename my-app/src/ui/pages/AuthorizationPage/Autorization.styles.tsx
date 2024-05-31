import Modal from 'react-modal';
import { styled } from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  transition: all 0.5s ease;
  padding: 50px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex: 1;
    &:last-child {
      display: none;
    }
  }
`;

export const Title = styled.h1`
  color: ${(props) => (props.color === "black" ? "white" : "black")};
`;

export const Paragraph = styled.p`
  color: ${(props) => (props.color === "black" ? "white" : "black")};
  margin-bottom: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const BackButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

export const ModalContainer = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000000;
  padding: 50px;
  color: white;
  border-radius: 4px;
  outline: none;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

export const SwitchButton = styled(Button)`
  @media (min-width: 769px) {
    display: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(146, 139, 139, 0.5);
`;