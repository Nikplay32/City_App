import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { SearchBar, StyledButton, StyledTitle, SearchBarContainer, Button, Logo, SidebarLink, MainContent, DashboardContainer, SidebarContainer, SidebarHeader, SidebarDivider, SidebarItem, SidebarSearch, SidebarSubmenu, SidebarSubmenuItem} from './Dashboard.styles';
import Navbar from '../organisms/Navbar';
import GlobalStyles from '../atoms/GlobalStyles';
import { User } from '../atoms/User';
import { Product } from '../atoms/Product';
import { Reservation } from '../atoms/Reservation';
import { Activity } from '../atoms/Activities';
import GenericTable from '../organisms/GenericTable';
import GenericPopup from '../organisms/GenericPopup';
import { DataType, TableConfig, tableConfigs } from '../../types/tableConfigs';
import { handleEdit, handleCreate, handleDelete } from '../../helpers/crudOperations';
import exportTableToPDF from './Test';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedData, setSelectedData] = useState<DataType | null>(null);
  const [activeTable, setActiveTable] = useState('users');
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [tableConfig, setTableConfig] = useState<TableConfig | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DataType[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [subscribersOnly, setSubscribersOnly] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const data = usersSnapshot.docs.map(doc => tableConfigs.users.createInstance(doc.id, doc.data()) as User);
      setUsers(data);
      setUserCount(data.length)
    };
    
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsRef);
      const data = productsSnapshot.docs.map(doc => tableConfigs.products.createInstance(doc.id, doc.data()) as Product);
      setProducts(data);
      setProductCount(data.length)
    };
    const fetchReservations = async () => {
      const reservationsRef = collection(db, 'reservations');
      const reservationsSnapshot = await getDocs(reservationsRef);
      const data = reservationsSnapshot.docs.map(doc => {
        const docData = doc.data();
        if (docData.reservationTime) {
          docData.reservationTime = new Date(docData.reservationTime);
        }
        return tableConfigs.reservations.createInstance(doc.id, docData) as Reservation;
      });
      setReservations(data);
      setReservationCount(data.length); 
    };
    const fetchActivities = async () => {
      const activitiesRef = collection(db, 'activities');
      const activitiesSnapshot = await getDocs(activitiesRef);
      const data = activitiesSnapshot.docs.map(doc => tableConfigs.activities.createInstance(doc.id, doc.data()) as Activity);
      setActivities(data);
    };
  
    fetchActivities();
    fetchReservations();
    fetchUsers();
    fetchProducts();
  }, []);

  type UserFields = keyof User;
  type ProductFields = keyof Product;

  useEffect(() => {
    if (activeTable === 'users') {
      setTableData(users);
      setTableConfig({
        columns: Object.keys(new User('', '', false)).map(field => ({
          title: field,
          render: (data: DataType) => (data as User)[field as keyof User],
        })),
        onAction: setSelectedData,
        onDelete: (data: DataType) => handleDelete(activeTable, data, (data: DataType) => {
          if (data instanceof User) {
            setUsers(users.filter(user => user.id !== data.id));
          } else if (data instanceof Product) {
            setProducts(products.filter(product => product.id !== data.id));
          }
        }),
        actionTitle: 'Change data',
      });
    } else if (activeTable === 'products') {
      setTableData(products);
      setTableConfig({
        columns: ['title'].map(field => ({
          title: field,
          render: (data: DataType) => (data as Product)[field as keyof Product],
        })),
        onAction: setSelectedData,
        onDelete: (data: DataType) => handleDelete(activeTable, data, (data: DataType) => {
          if (data instanceof User) {
            setUsers(users.filter(user => user.id !== data.id));
          } else if (data instanceof Product) {
            setProducts(products.filter(product => product.id !== data.id));
          }
        }),
        actionTitle: 'Change data',
      });
    } else if (activeTable === 'reservations') {
      setTableData(reservations);
      setTableConfig({
        columns: ['id', 'userId', 'productId', 'mileage', 'reservationTime', 'secondOption'].map(field => ({
          title: field,
          render: (data: DataType) => {
            const value = (data as Reservation)[field as keyof Reservation];
            return value instanceof Date ? value.toLocaleString() : value;
          },
        })),
        onAction: setSelectedData,
        onDelete: (data: DataType) => handleDelete(activeTable, data, (data: DataType) => {
          if (data instanceof Reservation) {
            setReservations(reservations.filter(reservation => reservation.id !== data.id));
          }
        }),
        actionTitle: 'Change data',
      });
    } else if (activeTable === 'activities') {
      setTableData(activities);
      setTableConfig({
        columns: ['id'].map(field => ({
          title: field,
          render: (data: DataType) => (data as Activity)[field as keyof Activity],
        })),
        onAction: setSelectedData,
        onDelete: (data: DataType) => handleDelete(activeTable, data, (data: DataType) => {
          if (data instanceof Activity) {
            setActivities(activities.filter(activity => activity.id !== data.id));
          }
        }),
        actionTitle: 'Change data',
      });
    }
  }, [activeTable, users, products, activities]);

  const handleDeleteRow = (data: DataType) => {
    handleDelete(activeTable, data, (data: DataType) => {
      if (data instanceof User) {
        setUsers(users.filter(user => user.id !== data.id));
      } else if (data instanceof Product) {
        setProducts(products.filter(product => product.id !== data.id));
      } else if (data instanceof Activity) {
        setActivities(activities.filter(activity => activity.id !== data.id));
      }
    });
  };

  useEffect(() => {
    if (searchTerm) {
      const allData = [...users, ...products, ...reservations, ...activities];
      const results = allData.filter(item => 
        Object.values(item).some(value => 
          value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(results);
  
      // Set activeTable based on the type of the first result
      if (results.length > 0) {
        const firstResult = results[0];
        if (firstResult instanceof User) {
          setActiveTable('users');
        } else if (firstResult instanceof Product) {
          setActiveTable('products');
        } else if (firstResult instanceof Reservation) {
          setActiveTable('reservations');
        } else if (firstResult instanceof Activity) {
          setActiveTable('activities');
        }
      }
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, users, products, reservations, activities]);

  return (
    <>
    <DashboardContainer>
      <GlobalStyles/>
      <SidebarContainer>
        <SidebarHeader>
        <Logo href="#">CITYSPIRIT</Logo>
        </SidebarHeader>
        <SearchBarContainer>
          <SearchBar 
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchBarContainer>
        <SidebarDivider />
        <SidebarLink href="/">Home</SidebarLink>
        <SidebarLink href="/products">Products</SidebarLink>
        <SidebarLink href="/activities">Activities</SidebarLink>
        <SidebarDivider />
        <SidebarLink onClick={() => setActiveTable('users')}>
          Users
        </SidebarLink>
        <SidebarLink onClick={() => setActiveTable('products')}>
          Products
        </SidebarLink>
        <SidebarLink onClick={() => setActiveTable('reservations')}>
          Reservations
        </SidebarLink>
        <SidebarLink onClick={() => setActiveTable('activities')}>
          Activities
        </SidebarLink>
        <SidebarDivider />
        <StyledButton onClick={() => {
          const tables = [
            { data: users, columns: tableConfigs.users.fields.map(field => ({ title: field, render: (data: any) => data[field] })), title: 'Users' },
            { data: products, columns: tableConfigs.products.fields.map(field => ({ title: field, render: (data: any) => data[field] })), title: 'Products' },
            { data: reservations, columns: tableConfigs.reservations.fields.map(field => ({ title: field, render: (data: any) => data[field] })), title: 'Reservations' },
            { data: activities, columns: tableConfigs.activities.fields.map(field => ({ title: field, render: (data: any) => data[field] })), title: 'Activities' },
          ];
          exportTableToPDF(tables);
        }}>
          Export to PDF
        </StyledButton>
        {/* More items */}
      </SidebarContainer>
      <MainContent>
        <div>
          <h2>Statistics</h2>
          <p>Number of users: {userCount}</p>
          <p>Number of products: {productCount}</p>
          <p>Number of reservations: {reservationCount}</p>
        </div>
        {tableConfig && (
          <div>
            <StyledTitle>Table: {activeTable}</StyledTitle>
            <StyledButton onClick={() => {
              setIsCreating(true);
              setSelectedData(
                activeTable === 'users' ? new User('', '', false) :
                activeTable === 'products' ? new Product('', '', '', [], '', '', [], '', '') :
                activeTable === 'reservations' ? new Reservation('', '', '', new Date(), '', '') :
                activeTable === 'activities' ? new Activity('', ['0', '0'], '', [], '', '') : // Add this line
                null
              );
            }}>Create {activeTable.slice(0, -1)}</StyledButton>   
            <GenericTable data={tableData} config={tableConfig} onDelete={handleDeleteRow} searchResults={searchResults} searchTerm={searchTerm} />
            {selectedData && <GenericPopup 
              data={isCreating ? 
                (activeTable === 'users' ? new User('', '', false) :
                activeTable === 'products' ? new Product('', '', '', [], '', '', [], '', '') :
                activeTable === 'reservations' ? new Reservation('', '', '', new Date(), '', '') :
                activeTable === 'activities' ? new Activity('', ['0', '0'], '', [], '', '') :
                new User('', '', false)) : 
                selectedData}
              onEdit={isCreating ? 
                (newData: DataType) => handleCreate(activeTable, newData, (newData: DataType) => {
                  if (newData instanceof User) {
                    setUsers([...users, newData as User]);
                  } else if (newData instanceof Product) {
                    setProducts([...products, newData as Product]);
                  } else if (newData instanceof Reservation) {
                    setReservations([...reservations, newData as Reservation]);
                  } else if (newData instanceof Activity) {
                    setActivities([...activities, newData as Activity]);
                  }
                  setIsCreating(false);
                }) :
                (newData: DataType) => handleEdit(activeTable, newData, (newData: DataType) => {
                  if (newData instanceof User) {
                    setUsers(users.map(user => user.id === newData.id ? newData : user));
                  } else if (newData instanceof Product) {
                    setProducts(products.map(product => product.id === newData.id ? newData : product));
                  } else if (newData instanceof Reservation) {
                    setReservations(reservations.map(reservation => reservation.id === newData.id ? newData : reservation));
                  } else if (newData instanceof Activity) {
                    setActivities(activities.map(activity => activity.id === newData.id ? newData : activity));
                  }
                  setSelectedData(null);
                })
              }
              onCancel={() => { setSelectedData(null); setIsCreating(false); }} 
              isCreating={isCreating}
              isOpen={!!selectedData}
            />}
          </div>
        )}
      </MainContent>
    </DashboardContainer>
    </>
  );
};

export default Dashboard;