import React, { useEffect, useState } from 'react';
import { Popup, Button, StyledInput, StyledTextarea, StyledModal, StyledForm } from '../pages/Dashboard.styles';
import { User } from '../atoms/User';
import { Product } from '../atoms/Product';
import { Reservation } from '../atoms/Reservation';
import Modal from 'react-modal';
import { Activity } from '../atoms/Activities';

type TableData = User | Product | Reservation | Activity;

const GenericPopup: React.FC<{ data: TableData; onEdit: (newData: TableData) => Promise<void>; onCancel: () => void; isCreating: boolean; isOpen: boolean }> = ({ data, onEdit, onCancel, isCreating, isOpen }) => {
  const [newData, setNewData] = useState(
    data instanceof User ? new User(data.id, data.username, data.isAdmin) :
    data instanceof Product ? new Product(data.id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title) :
    data instanceof Reservation ? new Reservation(data.id, data.mileage, data.productId, data.reservationTime, data.secondOption, data.userId) :
    data instanceof Activity ? new Activity(data.id, data.coordinates, data.date, data.images, data.price, data.title) :
    null
  );
  
  useEffect(() => {
    setNewData(
      data instanceof User ? new User(data.id, data.username, data.isAdmin) :
      data instanceof Product ? new Product(data.id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title) :
      data instanceof Reservation ? new Reservation(data.id, data.mileage, data.productId, data.reservationTime, data.secondOption, data.userId) :
      data instanceof Activity ? new Activity(data.id, data.coordinates, data.date, data.images, data.price, data.title) :
      null
    );
    console.log('New data:', newData);
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewData(prevData => {
      if (prevData instanceof User) {
        return new User(prevData.id, name === 'username' ? value : prevData.username, prevData.isAdmin);
      } else if (prevData instanceof Product) {
        return new Product(
          prevData.id,
          name === 'category' ? value : prevData.category,
          name === 'description' ? value : prevData.description,
          name === 'images' ? value.split('\n') : prevData.images,
          name === 'price' ? value : prevData.price,
          name === 'shortDescription' ? value : prevData.shortDescription,
          name === 'specification' ? value.split('\n') : prevData.specification,
          name === 'title' ? value : prevData.title
        );
      } else if (prevData instanceof Reservation) {
        return new Reservation(
          prevData.id,
          name === 'mileage' ? value : prevData.mileage,
          name === 'productId' ? value : prevData.productId,
          name === 'reservationTime' ? new Date(value) : prevData.reservationTime,
          name === 'secondOption' ? value : prevData.secondOption,
          name === 'userId' ? value : prevData.userId
        );
      } else if (prevData instanceof Activity) {
        return new Activity(
          prevData.id,
          name === 'coordinates' ? (value.match(/,/g)?.length === 1 ? value.split(',').map(str => str.trim()) as [string, string] : prevData.coordinates) : prevData.coordinates,
          name === 'date' ? value : prevData.date,
          name === 'images' ? value.split('\n') : prevData.images,
          name === 'price' ? value : prevData.price,
          name === 'title' ? value : prevData.title
        );
      }
      return prevData;
    });
    console.log('New data after input change:', newData);
  };
  const handleEdit = () => {
    if (newData) {
      onEdit(newData);
    }
    console.log('Edited data:', newData);
  };

  return (
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
            {key === 'images' || key === 'specification' ? (
              <StyledTextarea
                name={key}
                value={(newData as any)[key].join('\n')}
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
      <Button onClick={handleEdit}>Save</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </StyledModal>
  );
};

export default GenericPopup;
