import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, auth } from '../../../firebase';
import { collection, where, getDocs, query, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

interface SalonFormProps {
  salonId: string;
  onClose: () => void;
}

const FormContainer = styled.div`
  margin-top: 30px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ReservationDate = styled(DatePicker)`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const SelectedDateTime = styled.div`
  font-size: 1rem;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  height: 100px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;
type ServiceOption = {
  value: string;
  label: string;
};

const SalonForm: React.FC<SalonFormProps> = (props) => {
  const { salonId, onClose } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [comment, setComment] = useState('');
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);

  function getRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  useEffect(() => {
    const fetchSalonData = async () => {
      const salonDoc = doc(db, 'salons', salonId);
      const salonData = await getDoc(salonDoc);

      if (salonData.exists()) {
        const priceList = salonData.data().priceList;
        const formattedPriceList = priceList.map((service: string) => {
          const [name, price] = service.split(':');
          return { value: service, label: `${name.trim()} - ${price.trim()}` };
        });
        setServiceOptions(formattedPriceList);
      } else {
        console.log('No such document!');
      }
    };

    fetchSalonData();
  }, [salonId]);

  useEffect(() => {
    const startDate = new Date(); 
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);

    const dates: Date[] = [];
    for (let i = 0; i < 70; i++) { 
      dates.push(getRandomDate(startDate, endDate));
    }

    setBlockedDates(dates);
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    try {
      const userId = auth.currentUser?.uid; 
      if (!userId) {
        throw new Error('No user is currently signed in');
      }

      if (!/^[\w\s]+$/.test(name)) {
        toast.error('Name should only contain letters and spaces.');
        return;
      }
      if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(contactNumber)) {
        toast.error('Contact number should be a valid 10-digit number.');
        return;
      }

      if (!selectedService) {
        toast.error('Please select a service.');
        return;
      }

      const q = query(
        collection(db, 'salon_reservations'),
        where('userId', '==', userId),
        where('salonId', '==', salonId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error('You have already made a reservation for this salon.');
        return;
      }

      await addDoc(collection(db, 'salon_reservations'), {
        name,
        contactNumber,
        comment,
        selectedDate,
        selectedService: selectedService.value,
        userId, 
        salonId,
      });

      toast.success('Reservation submitted successfully!');
      setTimeout(() => {
        props.onClose();
      }, 1000);
      setName('');
      setContactNumber('');
      setComment('');
      setSelectedDate(new Date());
      setSelectedService(null);
    } catch (error) {
      console.error('Error adding reservation: ', error);
      toast.error('Error adding reservation.');
    }
  };

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <Title>Book an Appointment</Title>
        <FormGroup>
          <Label>Your Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </FormGroup>
        <FormGroup>
          <Label>Contact Number:</Label>
          <Input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
          />
        </FormGroup>
        <FormGroup>
          <Label>Select Service:</Label>
          <Select
            options={serviceOptions}
            value={selectedService}
            onChange={(selectedOption) => setSelectedService(selectedOption)}
            formatOptionLabel={({ label }) => {
              const index = label.indexOf('-');
              const name = label.slice(0, index);
              const price = label.slice(index + 1);
              return (
                <div>
                  {name}-<strong>{price}</strong>
                </div>
              );
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Select Date and Time:</Label>
          <ReservationDate
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
            excludeDates={blockedDates}
          />
        </FormGroup>
        <SelectedDateTime>Selected Date and Time: {selectedDate.toLocaleString()}</SelectedDateTime>
        <FormGroup>
          <Label>Additional Comments:</Label>
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Any special requests or comments?"
          />
        </FormGroup>
        <SubmitButton onClick={handleSubmit}>Book Appointment</SubmitButton>
      </FormContainer>
    </>
  );
};

export default SalonForm;