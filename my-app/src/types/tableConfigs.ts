import { User } from '../ui/atoms/User';
import { Product } from '../ui/atoms/Product';
import { Reservation } from '../ui/atoms/Reservation';
import { Activity } from '../ui/atoms/Activities';
import { Restaurant } from '../ui/atoms/Restaurant'; // Step 1: Import the Activity class
import { ReactNode } from 'react';
import { Salon } from '../ui/atoms/Salons';

type DataType = User | Product | Reservation | Activity | Restaurant | Salon; // Add Restaurant to the DataType type definition

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
    fields: ['username', 'email', 'password', 'isAdmin'],
    createInstance: (id: string, data: any) => new User(id, data.username,data.email, data.password, data.isAdmin ),
  },
  products: {
    fields: ['category', 'description', 'images', 'price', 'shortDescription', 'specification', 'title', 'subscribers_only'],
    createInstance: (id: string, data: any) => new Product(id, data.category, data.description, data.images, data.price, data.shortDescription, data.specification, data.title, data.subscribers_only),
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
  activities: {
    fields: ['category', 'coordinates', 'date', 'description', 'highlights', 'images', 'location', 'price', 'title', 'url'],
    createInstance: (id: string, data: any) => new Activity(id, data.category, data.coordinates, data.date, data.description, data.highlights, data.images, data.location, data.price, data.title, data.url),
  },
  restaurants: {
    fields: ['name', 'description', 'image', 'highlights'],
    createInstance: (id: string, data: any) => new Restaurant(id, data.name, data.description, data.image, data.highlights),
  },
  salons: {
    fields: ['name', 'description', 'image', 'highlights', 'priceList'],
    createInstance: (id: string, data: any) => new Salon(id, data.name, data.description, data.image, data.highlights, data.priceList),
  },
};

export { DataType, TableConfigs, tableConfigs, TableConfig };