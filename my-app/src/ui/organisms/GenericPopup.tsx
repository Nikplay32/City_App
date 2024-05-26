import React, { useEffect, useState } from 'react';
import { Popup, Button, StyledInput, StyledTextarea, StyledModal, StyledForm, ButtonSave, ButtonCancel } from '../pages/Dashboard/Dashboard.styles';
import { User } from '../atoms/User';
import { Product } from '../atoms/Product';
import { Reservation } from '../atoms/Reservation';
import Modal from 'react-modal';
import { Activity } from '../atoms/Activities';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type TableData = User | Product | Reservation | Activity;

const GenericPopup: React.FC<{ data: TableData; onEdit: (newData: TableData) => Promise<void>; onCancel: () => void; isCreating: boolean; isOpen: boolean }> = ({ data, onEdit, onCancel, isCreating, isOpen }) => {
  const [newData, setNewData] = useState<TableData | null>(
    data instanceof User ? new User(data.id, data.username, data.email,data.password, data.isAdmin) :
      data instanceof Product ? new Product(data.id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title, data.subscribers_only) :
        data instanceof Reservation ? new Reservation(data.id, data.mileage, data.productId, data.reservationTime, data.secondOption, data.userId) :
          data instanceof Activity ? new Activity(data.id, data.category, data.coordinates, data.date, data.description, data.highlights, data.images, data.location, data.price, data.title, data.url) :
            null
  );

  useEffect(() => {
    setNewData(
      data instanceof User ? new User(data.id, data.username, data.email,data.password, data.isAdmin) :
        data instanceof Product ? new Product(data.id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title, data.subscribers_only) :
          data instanceof Reservation ? new Reservation(data.id, data.mileage, data.productId, data.reservationTime, data.secondOption, data.userId) :
            data instanceof Activity ? new Activity(data.id, data.category, data.coordinates, data.date, data.description, data.highlights, data.images, data.location, data.price, data.title, data.url) :
              null
    );
  }, [data]);

  const onEditUser = async (newData: User) => {
    const auth = getAuth();
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, newData.email, newData.password);
      const user = userCredential.user;
  
      // Add the user to Firestore
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewData(prevData => {
      if (!prevData) return null;

      // Check if name is in the format "propertyName[index]"
      const arrayUpdateRegex = /(.+)\[(\d+)\]/;
      const match = name.match(arrayUpdateRegex);
      if (match) {
        const [, propertyName, indexStr] = match;
        const index = parseInt(indexStr, 10);
        if (Array.isArray(prevData[propertyName as keyof typeof prevData])) {
          // If it is, update the specific array element
          const newDataCopy = { ...prevData };
          (newDataCopy[propertyName as keyof typeof newDataCopy] as unknown as string[])[index] = value;
          return newDataCopy as TableData;
        }
      }

      // Existing code...
      switch (prevData.constructor) {
        case User:
          return new User(
            prevData.id,
            name === 'username' ? value : (prevData as User).username,
            name === 'email' ? value : (prevData as User).email,
            name === 'password' ? value : (prevData as User).password,
            (prevData as User).isAdmin
          );
        case Product:
          if (name === 'images' || name === 'specification') {
            const newValue = value.split('\n');
            return { ...prevData, [name]: newValue };
          } else {
            return new Product(
              prevData.id,
              name === 'category' ? value : (prevData as Product).category,
              name === 'description' ? value : (prevData as Product).description,
              name === 'images' ? (Array.isArray(value) ? value : [value]) : (prevData as Product).images,
              name === 'price' ? Number(value) : (prevData as Product).price, // Convert value to number
              name === 'shortDescription' ? value : (prevData as Product).shortDescription,
              name === 'specification' ? (Array.isArray(value) ? value : [value]) : (prevData as Product).specification,
              name === 'title' ? value : (prevData as Product).title,
              name === 'subscribers_only' ? value : (prevData as Product).subscribers_only
            );
          }
        case Reservation:
          return new Reservation(
            prevData.id,
            name === 'mileage' ? value : (prevData as Reservation).mileage,
            name === 'productId' ? value : (prevData as Reservation).productId,
            name === 'reservationTime' ? new Date(value) : (prevData as Reservation).reservationTime,
            name === 'secondOption' ? value : (prevData as Reservation).secondOption,
            name === 'userId' ? value : (prevData as Reservation).userId
          );
        case Activity:
          if (name === 'images') {
            const newValue = value.split('\n');
            return { ...prevData, [name]: newValue };
          } else {
            return new Activity(
              prevData.id,
              name === 'category' ? value : (prevData as Activity).category,
              name === 'coordinates' ? (value.match(/,/g)?.length === 1 ? [value.split(',')[0].trim(), value.split(',')[1].trim()] as [string, string] : (prevData as Activity).coordinates) : (prevData as Activity).coordinates,
              name === 'date' ? value : (prevData as Activity).date,
              name === 'description' ? value : (prevData as Activity).description,
              name === 'highlights' ? value.split('\n') : (prevData as Activity).highlights,
              name === 'images' ? value.split('\n') : (prevData as Activity).images,
              name === 'location' ? value : (prevData as Activity).location,
              name === 'price' ? (isNaN(parseFloat(value)) ? (prevData as Activity).price : parseFloat(value)) : (prevData as Activity).price,
              name === 'title' ? value : (prevData as Activity).title,
              name === 'url' ? value : (prevData as Activity).url
            );
          }
        default:
          return prevData;
      }
    });
  };

  const handleAddElement = (event: React.MouseEvent, propertyName: string) => {
    event.preventDefault();
    setNewData(prevData => {
      if (!prevData) return null;

      const newDataCopy = { ...prevData };
      if (Array.isArray(newDataCopy[propertyName as keyof typeof newDataCopy])) {
        (newDataCopy[propertyName as keyof typeof newDataCopy] as unknown as string[]).push('');
      }
      return newDataCopy as TableData;
    });
  };

  const handleEdit = async () => {
    if (newData instanceof User) {
      await onEditUser(newData);
      toast.success("User created successfully");
    } else if (newData instanceof Product) {
      onEdit(newData);
      toast.success("Product created successfully");
    } else if (newData instanceof Reservation) {
      onEdit(newData);
      toast.success("Reservation created successfully");
    } else if (newData instanceof Activity) {
      onEdit(newData);
      toast.success("Activity created successfully");
    }
    setTimeout(onCancel, 400);
  };

  return (
    <>
    <ToastContainer />
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Edit Modal"
    >
      <h2>{isCreating ? 'Create' : 'Edit'} {data instanceof User ? 'User' : data instanceof Product ? 'Product' : data instanceof Reservation ? 'Reservation' : data instanceof Activity ? 'Activity' : 'Unknown'}</h2>
      {newData && Object.keys(newData).map((key) => (
        key !== 'id' || !isCreating ? (
          <StyledForm key={key}>
            <label>{key}</label>
            {(key === 'images' || key === 'specification') && Array.isArray(newData[key as keyof typeof newData]) ? (
              <div>
                {(newData[key as keyof typeof newData] as unknown as string[]).map((item: string, index: number) => (
                  <div key={index}>
                    <StyledInput
                      type="text"
                      name={`${key}[${index}]`}
                      value={item}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                <Button onClick={(event) => handleAddElement(event, key)}>Add Element</Button>
              </div>
            ) : (
              <StyledInput
                type="text"
                name={key}
                value={(newData as any)[key]}
                onChange={handleInputChange}
              />
            )}
          </StyledForm>
        ) : null
      ))}
      <ButtonSave onClick={handleEdit}>Save</ButtonSave>
      <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
    </StyledModal>
    </>
  );
};

export default GenericPopup;
