import React, { useEffect, useState } from 'react';
import { StyledInput, StyledTextarea, StyledModal, StyledForm, ButtonSave, ButtonCancel } from '../pages/Dashboard/Dashboard.styles';
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

type TableData = User | Product | Reservation | Activity | Restaurant | Salon;

const GenericPopup: React.FC<{ data: TableData; onEdit: (newData: TableData) => Promise<void>; onCancel: () => void; isCreating: boolean; isOpen: boolean }> = ({ data, onEdit, onCancel, isCreating, isOpen }) => {
  const [newData, setNewData] = useState<TableData | null>(
    data instanceof User ? new User(data.id, data.username, data.email, data.password, data.isAdmin) :
      data instanceof Product ? new Product(data.id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title, data.subscribers_only) :
        data instanceof Reservation ? new Reservation(data.id, data.mileage, data.productId, data.reservationTime, data.secondOption, data.userId) :
          data instanceof Activity ? new Activity(data.id, data.category, data.coordinates, data.date, data.description, data.highlights, data.images, data.location, data.price, data.title, data.url) :
            data instanceof Restaurant ? new Restaurant(data.id, data.name, data.description, data.image, data.highlights) :
              data instanceof Salon ? new Salon(data.id, data.name, data.description, data.image, data.highlights, data.priceList) :
                null
  );

  useEffect(() => {
    setNewData(
      data instanceof User ? new User(data.id, data.username, data.email, data.password, data.isAdmin) :
        data instanceof Product ? new Product(data.id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title, data.subscribers_only) :
          data instanceof Reservation ? new Reservation(data.id, data.mileage, data.productId, data.reservationTime, data.secondOption, data.userId) :
            data instanceof Activity ? new Activity(data.id, data.category, data.coordinates, data.date, data.description, data.highlights, data.images, data.location, data.price, data.title, data.url) :
              data instanceof Restaurant ? new Restaurant(data.id, data.name, data.description, data.image, data.highlights) :
                data instanceof Salon ? new Salon(data.id, data.name, data.description, data.image, data.highlights, data.priceList) :
                  null
    );
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewData(prevData => {
    if (!prevData) return null;

    if (name === 'images' || name === 'specification' || name === 'highlights' || name === 'priceList') {
      const newValue = value ? value.split('\n') : [];
      return { ...prevData, [name]: newValue };
    }

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
          return new Product(
            prevData.id,
            name === 'category' ? value : (prevData as Product).category,
            name === 'description' ? value : (prevData as Product).description,
            name === 'images' ? value.split('\n') : (prevData as Product).images,
            name === 'price' ? Number(value) : (prevData as Product).price,
            name === 'shortDescription' ? value : (prevData as Product).shortDescription,
            name === 'specification' ? value.split('\n') : (prevData as Product).specification,
            name === 'title' ? value : (prevData as Product).title,
            name === 'subscribers_only' ? value : (prevData as Product).subscribers_only
          );
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
        case Restaurant:
          return new Restaurant(
            prevData.id,
            name === 'name' ? value : (prevData as Restaurant).name,
            name === 'description' ? value : (prevData as Restaurant).description,
            name === 'image' ? value : (prevData as Restaurant).image,
            name === 'highlights' ? value.split('\n') : (prevData as Restaurant).highlights
          );
        case Salon:
          return new Salon(
            prevData.id,
            name === 'name' ? value : (prevData as Salon).name,
            name === 'description' ? value : (prevData as Salon).description,
            name === 'image' ? value : (prevData as Salon).image,
            name === 'highlights' ? value.split('\n') : (prevData as Salon).highlights,
            name === 'priceList' ? value.split('\n') : (prevData as Salon).priceList
          );
        default:
          return prevData;
      }
    });
  };

  const handleEdit = async () => {
    if (newData) {
      if (newData instanceof User) {
        await onEditUser(newData);
        toast.success("User updated successfully");
      } else {
        await onEdit(newData);
        toast.success(`${newData.constructor.name} updated successfully`);
      }
      setTimeout(onCancel, 400);
    } else {
      toast.error("No data to update");
    }
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
        {newData && Object.keys(newData).map((key) => (
          key !== 'id' || !isCreating ? (
            <StyledForm key={key}>
              <label>{key}</label>
              {(key === 'images' || key === 'specification' || key === 'highlights' || key === 'priceList') ? (
                <StyledTextarea
                  name={key}
                  value={(newData[key as keyof typeof newData] as unknown as string[]).join('\n')}
                  onChange={handleInputChange}
                />
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
