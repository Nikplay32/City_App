import React from 'react';
import { Table, TableRow, TableHeader, TableCell, Button } from '../pages/Dashboard/Dashboard.styles';
import { User } from '../atoms/User';
import { Product } from '../atoms/Product';
import { Reservation } from '../atoms/Reservation';
import { Activity } from '../atoms/Activities';

type TableData = User | Product | Reservation | Activity;

type TableConfig = {
  columns: {
    title: string;
    render: (data: TableData) => React.ReactNode;
  }[];
  onAction: (data: TableData) => void;
  onDelete: (data: TableData) => Promise<void>; 
  actionTitle: string;
};

const GenericTable: React.FC<{ data: TableData[]; config: TableConfig; onDelete: (data: TableData) => void; searchResults: TableData[]; searchTerm: string }> = ({ data, config, onDelete, searchResults, searchTerm }) => {
  return (
    <Table>
      <thead>
        <TableRow>
          {config.columns.map((column, index) => (
            <TableHeader key={index}>{column.title}</TableHeader>
          ))}
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index}>
          {config.columns.map((column, index) => {
            if (column.render) {
              const cellContent = column.render(item);
              if (cellContent) {
                const cellContentString = cellContent.toString();
                const isMatch = searchTerm !== "" && cellContentString.toLowerCase().includes(searchTerm.toLowerCase());
                return (
                  <TableCell 
                    key={index}
                    style={isMatch ? { backgroundColor: 'yellow' } : {}}
                  >
                    {cellContentString}
                  </TableCell>
                );
              }
            }
            return null;
          })}
            <TableCell>
              <Button onClick={() => config.onAction(item)}>{config.actionTitle}</Button>
              <Button onClick={() => onDelete(item)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default GenericTable;