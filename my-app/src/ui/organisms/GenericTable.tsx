import React, { useEffect, useState } from 'react';
import { Card, CardTitle, CardContent, ActionButton, DeleteButton, Data } from '../pages/Dashboard/Dashboard.styles';
import { User } from '../atoms/User';
import { Product } from '../atoms/Product';
import { Reservation } from '../atoms/Reservation';
import { Activity } from '../atoms/Activities';
import { Restaurant } from '../atoms/Restaurant';
import { Salon } from '../atoms/Salons';
import {
  PaginationContainer,
  PageButton,
} from '../pages/Products.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type TableData = User | Product | Reservation | Activity | Restaurant | Salon;

type TableConfig = {
  columns: {
    title: string;
    render: (data: TableData) => React.ReactNode;
  }[];
  onAction: (data: TableData) => void;
  onDelete: (data: TableData) => Promise<void>;
  actionTitle: string;
};

const ITEMS_PER_PAGE = 6;

const GenericTable: React.FC<{ data: TableData[]; config: TableConfig; onDelete: (data: TableData) => void; searchResults: TableData[]; searchTerm: string }> = ({ data, config, onDelete, searchResults, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const dataForCurrentPage = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      {data.length > ITEMS_PER_PAGE && (
        <PaginationContainer>
          {currentPage > 1 && (
            <PageButton onClick={() => handlePageChange(currentPage - 1)}>
              <FaChevronLeft />
            </PageButton>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          {currentPage < totalPages && (
            <PageButton onClick={() => handlePageChange(currentPage + 1)}>
              <FaChevronRight />
            </PageButton>
          )}
        </PaginationContainer>
      )}
      <Data>
        {dataForCurrentPage.map((item, index) => (
          <Card key={index}>
            {config.columns.map((column, index) => {
              if (column.render) {
                const cellContent = column.render(item);
                if (cellContent) {
                  const cellContentString = typeof cellContent === 'string' ? cellContent : '';
                  const isMatch = searchTerm !== "" && cellContentString.toLowerCase().includes(searchTerm.toLowerCase());
                  return (
                    <CardContent
                      key={index}
                      style={isMatch ? { backgroundColor: 'yellow' } : {}}
                    >
                      <CardTitle>{column.title}</CardTitle>
                      {cellContent} {/* Render cellContent directly */}
                    </CardContent>
                  );
                }
              }
              return null;
            })}
            <div>
              <ActionButton onClick={() => config.onAction(item)}>{config.actionTitle}</ActionButton>
              <DeleteButton onClick={() => onDelete(item)}>Delete</DeleteButton>
            </div>
          </Card>
        ))}
      </Data>
    </>
  );
};

export default GenericTable;