import React, { useEffect, useState } from 'react';
import {
  StyledInput, StyledModal, StyledForm, ButtonSave, ButtonCancel,
  ArrayButton, ArrayItemContainer
} from '../pages/Dashboard/Dashboard.styles';
import styled from 'styled-components';
import { User } from '../atoms/User';
import { Product } from '../atoms/Product';
import { Reservation } from '../atoms/Reservation';
import Modal from 'react-modal';
import { Activity } from '../atoms/Activities';
import { Restaurant } from '../atoms/Restaurant';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Salon } from '../atoms/Salons';
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ArrayItemInput = styled(StyledInput)`
  flex: 1;
  margin-right: 10px;
`;

const ImagePreview = styled.img`
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

type TableData = User | Product | Reservation | Activity | Restaurant | Salon;

const GenericPopup: React.FC<{ data: TableData; onEdit: (newData: TableData) => Promise<void>; onCancel: () => void; isCreating: boolean; isOpen: boolean }> = ({ data, onEdit, onCancel, isCreating, isOpen }) => {
  const [newData, setNewData] = useState<TableData | null>(null);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const onEditUser = async (newData: User) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newData.email, newData.password);
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        username: newData.username,
        email: newData.email,
        isAdmin: newData.isAdmin,
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number, fieldName?: string) => {
    const { name, value } = event.target;
    let convertedValue: string | number = value; // Allow convertedValue to be either string or number
    if (name === 'price') {
      convertedValue = Number(value);
    }
    setNewData(prevData => {
      if (!prevData) return null;

      if (fieldName) {
        const arrayField = prevData[fieldName as keyof typeof prevData];
        if (Array.isArray(arrayField) && typeof index === 'number') {
          const newArray = [...arrayField];
          newArray[index] = convertedValue;
          return { ...prevData, [fieldName]: newArray };
        }
        return prevData;
      }

      return { ...prevData, [name]: convertedValue };
    });
  };

  const addArrayItem = (fieldName: string) => {
    setNewData(prevData => {
      if (!prevData) return null;
      const arrayField = prevData[fieldName as keyof typeof prevData];
      if (Array.isArray(arrayField)) {
        const newArray = [...arrayField, ''];
        return { ...prevData, [fieldName]: newArray };
      }
      return prevData;
    });
  };

  const removeArrayItem = (fieldName: string, index: number) => {
    setNewData(prevData => {
      if (!prevData) return null;
      const arrayField = prevData[fieldName as keyof typeof prevData];
      if (Array.isArray(arrayField)) {
        const newArray = arrayField.filter((_, i) => i !== index);
        return { ...prevData, [fieldName]: newArray };
      }
      return prevData;
    });
  };

  const handleEdit = async () => {
    if (newData) {
      let nonEmptyInputCount = 0;
      Object.keys(newData).forEach(key => {
        // Use type assertion to tell TypeScript that key is a valid key of newData
        const value = newData[key as keyof typeof newData];
        if (Array.isArray(value)) {
          nonEmptyInputCount += value.filter(item => item.trim() !== '').length;
        } else if (typeof value === 'string' && value.trim() !== '') {
          nonEmptyInputCount++;
        }
      });
  
      // Check if there are more than 2 non-empty inputs
      if (nonEmptyInputCount > 2) {
        if (newData instanceof User) {
          await onEditUser(newData);
          toast.success("User updated successfully");
        } else {
          await onEdit(newData);
          toast.success(`${newData.constructor.name} updated successfully`);
        }
        setTimeout(onCancel, 400);
      } else {
        // Show error message if not enough data is provided
        toast.error("Please fill in more than two fields to save.");
      }
    } else {
      toast.error("No data to update");
    }
  };

  const isStringArray = (value: any): value is string[] => {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
  };

  const isImageField = (key: string): boolean => {
    return key === 'images'; // Adjust this to match your image field name
  };

  return (
    <>
      <ToastContainer />
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onCancel}
        contentLabel="Edit Modal"
      >
        <h2>{isCreating ? 'Create' : 'Edit'} {newData?.constructor.name}</h2>
        <ButtonSave onClick={handleEdit}>Save</ButtonSave>
        <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
        {newData && Object.keys(newData).map((key) =>
          key !== 'id' || !isCreating ? (
            <StyledForm key={key}>
              <label>{key}</label>
              {isStringArray(newData[key as keyof TableData]) ? (
                <>
                  {(newData[key as keyof TableData] as unknown as string[]).map((value, index) => (
                    <ArrayItemContainer key={index}>
                      {isImageField(key) && <ImagePreview src={value} alt="Image preview" />}
                      <ArrayItemInput
                        type="text"
                        name={key}
                        value={value}
                        onChange={(e) => handleInputChange(e, index, key)}
                      />
                      <ArrayButton type="button" onClick={() => removeArrayItem(key, index)}>Remove</ArrayButton>
                    </ArrayItemContainer>
                  ))}
                  <ArrayButton type="button" onClick={() => addArrayItem(key)}>Add</ArrayButton>
                </>
              ) : (
                <StyledInput
                  type="text"
                  name={key}
                  value={(newData as any)[key]}
                  onChange={(e) => handleInputChange(e)}
                />
              )}
            </StyledForm>
          ) : null
        )}
      </StyledModal>
    </>
  );
};

export default GenericPopup;
