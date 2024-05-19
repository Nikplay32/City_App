import { User } from '../ui/atoms/User';
import { Product } from '../ui/atoms/Product';
import { Reservation } from '../ui/atoms/Reservation';
import { Activity } from '../ui/atoms/Activities'; // Step 1: Import the Activity class
import { ReactNode } from 'react';

type DataType = User | Product | Reservation | Activity; // Step 2: Add Activity to the DataType type definition

type TableConfigs = {
  fields: string[];
  createInstance: (id: string, data: any) => DataType;
};

type TableConfig = {
  columns: {
    title: string;
    render: (data: DataType) => ReactNode;
  }[];
  onAction: (data: DataType) => void;
  onDelete: (data: DataType) => Promise<void>; 
  actionTitle: string;
};

const tableConfigs: Record<string, TableConfigs> = {
  users: {
    fields: ['username'],
    createInstance: (id: string, data: any) => new User(id, data.username, data.isAdmin),
  },
  products: {
    fields: ['category', 'description', 'images', 'price', 'shortDescription', 'specification', 'title'],
    createInstance: (id: string, data: any) => new Product(id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title),
  },
  reservations: {
    fields: ['id', 'mileage', 'productId', 'reservationTime', 'secondOption', 'userId'],
    createInstance: (id, data) => {
      let reservationTime = data.reservationTime;
      if (reservationTime && typeof reservationTime.toDate === 'function') {
        reservationTime = reservationTime.toDate();
      }
      return new Reservation(id, data.mileage, data.productId, reservationTime, data.secondOption, data.userId);
    },
  },
  activities: { // Step 3: Add a new entry for activities
    fields: ['coordinates', 'date', 'images', 'price', 'title'],
    createInstance: (id: string, data: any) => new Activity(id, data.coordinates, data.date, data.images, data.price, data.title),
  },
};

export { DataType, TableConfigs, tableConfigs, TableConfig };