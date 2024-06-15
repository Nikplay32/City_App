import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { SearchBar, AdminNote, StyledButton, StyledTitle, StyledText, SearchBarContainer, Button, Logo, SidebarLink, MainContent, DashboardContainer, SidebarContainer, SidebarHeader, SidebarDivider, SidebarItem, SidebarSearch, SidebarSubmenu, SidebarSubmenuItem} from './Dashboard.styles';
import Navbar from '../../organisms/Navbar';
import GlobalStyles from '../../atoms/GlobalStyles';
import { User } from '../../atoms/User';
import { Product } from '../../atoms/Product';
import { Reservation } from '../../atoms/Reservation';
import { Restaurant } from '../../atoms/Restaurant';
import { Activity } from '../../atoms/Activities';
import GenericTable from '../../organisms/GenericTable';
import GenericPopup from '../../organisms/GenericPopup';
import { DataType, TableConfig, tableConfigs } from '../../../types/tableConfigs';
import { handleEdit, handleCreate, handleDelete } from '../../../helpers/crudOperations';
import exportTableToPDF from '../../utils/Test';
import styled from "styled-components";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Salon } from '../../atoms/Salons';
import { FaHome } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";

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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [salons, setSalons] = useState<Salon[]>([]);

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
    const fetchRestaurants = async () => {
      const restaurantsRef = collection(db, 'restaurants');
      const restaurantsSnapshot = await getDocs(restaurantsRef);
      const data = restaurantsSnapshot.docs.map(doc => tableConfigs.restaurants.createInstance(doc.id, doc.data()) as Restaurant);
      setRestaurants(data);
    };
    const fetchSalons = async () => {
      const salonsRef = collection(db, 'salons'); // Replace 'salons' with the actual collection name
      const salonsSnapshot = await getDocs(salonsRef);
      const data = salonsSnapshot.docs.map(doc => tableConfigs.salons.createInstance(doc.id, doc.data()) as Salon); // Replace 'salons' with the actual config name
      setSalons(data); // Replace with the actual state setter function
    };

    fetchSalons();
    fetchRestaurants();
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
        columns: ['username', 'email'].map(field => ({
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
        columns: [
          {
            title: '',
            render: (data: DataType) => {
              const product = data as Product;
              return product.title;
            },
          },
          {
            title: '',
            render: (data: DataType) => {
              const product = data as Product;
              return <img src={product.images[0]} alt={product.title} style={{width: '220px', height: '160px'}} />;
            },
          },
        ],
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
    } else if (activeTable === 'restaurants') {
      setTableData(restaurants);
      setTableConfig({
        columns: [
          {
            title: '', // Set to empty to not display the column name
            render: (data: DataType) => {
              const restaurant = data as Restaurant;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span>{restaurant.name}</span>
                  <img src={restaurant.image} alt="Restaurant" style={{ width: '270px', height: '200px' }} />
                </div>
              );
            },
          }
        ],
        onAction: setSelectedData,
        onDelete: (data: DataType) => handleDelete(activeTable, data, (data: DataType) => {
          if (data instanceof Restaurant) {
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== data.id));
          }
        }),
        actionTitle: 'Change data',
      });
    } else if (activeTable === 'salons') {
      setTableData(salons); // Replace with the actual state variable for salons
      setTableConfig({
        columns: ['Salons Name:'].map(field => ({ // Replace 'name' and 'address' with the actual fields of your Salon type
          title: field, // Replace Salon with the actual Salon type
          render: (data: DataType) => (data as Salon).name,
        })),
        onAction: setSelectedData,
        onDelete: (data: DataType) => handleDelete(activeTable, data, (data: DataType) => {
          if (data instanceof Salon) { // Replace Salon with the actual Salon type
            setSalons(salons.filter(salon => salon.id !== data.id)); // Replace with the actual state setter function and variable for salons
          }
        }),
        actionTitle: 'Change data',
      });
    }
  }, [activeTable, users, products, activities, salons]);

  const handleDeleteRow = async (data: DataType) => {
    await handleDelete(activeTable, data, async (data: DataType) => {
      let updatedData;
      let entityName = ''; // To hold the name of the entity being deleted
      if (data instanceof User) {
        updatedData = users.filter(user => user.id !== data.id);
        setUsers(updatedData);
        entityName = 'User';
      } else if (data instanceof Product) {
        updatedData = products.filter(product => product.id !== data.id);
        setProducts(updatedData);
        entityName = 'Product';
      } else if (data instanceof Activity) {
        updatedData = activities.filter(activity => activity.id !== data.id);
        setActivities(updatedData);
        entityName = 'Activity';
      } else if (data instanceof Restaurant) {
        updatedData = restaurants.filter(restaurant => restaurant.id !== data.id);
        setRestaurants(updatedData);
        entityName = 'Restaurant';
      } else if (data instanceof Salon) {
        updatedData = salons.filter(salon => salon.id !== data.id);
        setSalons(updatedData);
        entityName = 'Salon';
      }
      // Show success toast
      if (updatedData) {
        toast.success(`${entityName} deleted successfully!`);
      }
      // Use updatedData for your table data
    });
  };

  useEffect(() => {
    if (searchTerm) {
      const allData = [...users, ...products, ...reservations, ...activities, ...restaurants, ...salons]; // Add salons to the allData array
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
        } else if (firstResult instanceof Restaurant) {
          setActiveTable('restaurants');
        } else if (firstResult instanceof Salon) {
          setActiveTable('salons'); 
        }
      }
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, users, products, reservations, activities, restaurants, salons]);

  return (
    <>
    <ToastContainer />
    <DashboardContainer>
      <GlobalStyles/>
      <SidebarContainer>
        <SidebarHeader>
        <Logo href="#">CITYSPIRIT</Logo>
        </SidebarHeader>
        <SidebarDivider />
        <StyledText>Links</StyledText>
        <SidebarLink href="/"><FaHome></FaHome></SidebarLink>
        <SidebarLink href="/products"><FaCar></FaCar></SidebarLink>
        <SidebarLink href="/activities"><FaTreeCity></FaTreeCity></SidebarLink>
        <SidebarDivider />
        <StyledText>Tables</StyledText>
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
        <SidebarLink onClick={() => setActiveTable('restaurants')}>
          Restaurants
        </SidebarLink>
        <SidebarLink onClick={() => setActiveTable('salons')}>
          Salons
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
        {/* <div>
          <h2>Statistics</h2>
          <p>Number of users: {userCount}</p>
          <p>Number of products: {productCount}</p>
          <p>Number of reservations: {reservationCount}</p>
        </div> */}
        {tableConfig && (
          <div>
            <StyledTitle>Table: {activeTable}</StyledTitle>
            <SearchBarContainer>
              <SearchBar 
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </SearchBarContainer>
            <StyledButton onClick={() => {
              setIsCreating(true);
              setSelectedData(
                activeTable === 'users' ? new User('', '', '','', false) :
                activeTable === 'products' ? new Product('', '', '', [], 0, '', [], '', '') :
                activeTable === 'reservations' ? new Reservation('', '', '', new Date(), '', '') :
                activeTable === 'activities' ? new Activity('', '', ['0', '0'], '', '', [], [], '', 0, '', '') : // Add this line
                activeTable === 'restaurants' ? new Restaurant('', '', '', '', []) : // Add this line
                activeTable === 'salons' ? new Salon('', '', '', '', [], []) : 
                null
              );
            }}>Create {activeTable.slice(0, -1)}</StyledButton>   
            {/* <AdminNote>
            ADMIN NOTE - Please when adding new product firstly fill data and then add images and specification. <br /> Also when adding free cars dont fill subscribers_only field. Leave it empty. Thanks!
            </AdminNote> */}
            <GenericTable data={tableData} config={tableConfig} onDelete={handleDeleteRow} searchResults={searchResults} searchTerm={searchTerm} />
            {selectedData && <GenericPopup 
              data={isCreating ? 
                (activeTable === 'users' ? new User('', '', '','', false) :
                activeTable === 'products' ? new Product('', '', '', [], 0, '', [], '', '') :
                activeTable === 'reservations' ? new Reservation('', '', '', new Date(), '', '') :
                activeTable === 'activities' ? new Activity('', '', ['0', '0'], '', '', [], [], '', 0, '', '') :
                activeTable === 'restaurants' ? new Restaurant('', '', '', '', []) :
                activeTable === 'salons' ? new Salon('', '', '', '', [], []) : 
                new User('', '','','', false)) : 
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
                  } else if (newData instanceof Restaurant) {
                    setRestaurants([...restaurants, newData as Restaurant]);
                  } else if (newData instanceof Salon) {
                    setSalons([...salons, newData as Salon]);
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
                  } else if (newData instanceof Restaurant) { 
                    setRestaurants(restaurants.map(restaurant => restaurant.id === newData.id ? newData : restaurant));
                  } else if (newData instanceof Salon) { // Replace Salon with the actual Salon type
                    setSalons(salons.map(salon => salon.id === newData.id ? newData : salon)); // Replace setSalons and salons with the actual setSalons function and salons state variable
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