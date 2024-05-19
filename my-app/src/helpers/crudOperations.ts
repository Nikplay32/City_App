// crudOperations.ts
import { doc, updateDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { DataType, tableConfigs } from '../types/tableConfigs';

export const handleEdit = async (activeTable: string, newData: DataType, updateFunction: (newData: DataType) => void) => {
  const ref = doc(db, activeTable, newData.id);
  const updateData = tableConfigs[activeTable].fields.reduce((acc, field) => {
    if (newData[field as keyof DataType] !== undefined) {
      acc[field] = newData[field as keyof DataType];
    }
    return acc;
  }, {} as Record<string, any>);
  await updateDoc(ref, updateData);
  updateFunction(newData);
};

export const handleCreate = async (activeTable: string, newData: DataType, addFunction: (newData: DataType) => void) => {
  const ref = collection(db, activeTable);
  const createData = tableConfigs[activeTable].fields.reduce((acc, field) => {
    acc[field] = newData[field as keyof DataType];
    return acc;
  }, {} as Record<string, any>);
  const docRef = await addDoc(ref, createData);
  newData.id = docRef.id;
  addFunction(newData);
};

export const handleDelete = async (activeTable: string, data: DataType, deleteFunction: (data: DataType) => void) => {
  const ref = doc(db, activeTable, data.id);
  await deleteDoc(ref);
  deleteFunction(data);
};