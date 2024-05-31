// ProductOverview.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import GlobalStyles from '../../atoms/GlobalStyles';
import Navbar from '../../organisms/Navbar';
import Footer from '../../organisms/Footer';
import FormContainer from '../../organisms/FormContainer';
import { addDoc, collection } from 'firebase/firestore';
import { downloadActivityPDF } from './ActivityGeneration';
import QRCode from 'qrcode.react';
import Map from '../../organisms/ActivityMap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../../firebase';
import {
  ActivityContainer,
  ImageContainer,
  Image,
  InfoContainer,
  DescriptionContainer,
  Description,
  AddToCartButton,
  TitleContainer,
  TitleText,
  TitleBorder,
  HighlightsContainer,
  Highlight,
  Note
} from './ActivityOverview.styles';

interface Activity {
  id: string;
  title: string;
  images: string[];
  date: string;
  price: number;
  shortDescription: string;
  description: string;
  category: string;
  location: string;
  url: string;
  highlights: string[];
  coordinates: [number, number];
}

const ActivityOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [qrValuePDF, setQrValuePDF] = useState('');
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [ticketPurchased, setTicketPurchased] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [canPurchase, setCanPurchase] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        const activityDoc = doc(db, 'activities', id);
        const activityData = await getDoc(activityDoc);

        if (activityData.exists()) {
          setActivity({
            ...activityData.data(),
            images: activityData.data().images || [], 
          } as Activity);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchActivity();
  }, [id]);

  useEffect(() => {
    const syncWithDatabase = async () => {
      if (auth.currentUser && id) {
        const q = query(
          collection(db, 'activity_tickets'),
          where('userId', '==', auth.currentUser.uid),
          where('activityId', '==', id)
        );

        const querySnapshot = await getDocs(q);
        let totalTickets = 0;

        querySnapshot.forEach((doc) => {
          totalTickets += doc.data().quantity;
        });

        // Sync the total tickets with localStorage
        localStorage.setItem(`totalTickets_${id}`, totalTickets.toString());

        if (totalTickets >= 5) {
          setCanPurchase(false);
        } else {
          setCanPurchase(true);
        }
      }
    };

    syncWithDatabase();
  }, [id]);

  const handleAddToCart = async (quantity: number, totalPrice: number) => {
    setLoading(true);
    if (auth.currentUser) {
      if (activity) {
        const q = query(
          collection(db, 'activity_tickets'),
          where('userId', '==', auth.currentUser.uid),
          where('activityId', '==', id)
        );

        const querySnapshot = await getDocs(q);
        let totalTickets = 0;

        querySnapshot.forEach((doc) => {
          totalTickets += doc.data().quantity;
        });
        localStorage.setItem('totalTickets', (totalTickets + quantity).toString());

        if (totalTickets + quantity > 5) {
          toast.error('You cannot purchase more than 5 tickets.');
          return;
        }

        const docRef = await addDoc(collection(db, 'activity_tickets'), {
          userId: auth.currentUser.uid,
          activityId: id,
          title: activity.title,
          date: activity.date,
          location: activity.location,
          quantity: quantity,
          totalPrice: totalPrice,
        });
        setTicketId(docRef.id);
        await downloadActivityPDF(activity, docRef.id, quantity, qrCodeRef, setQrValuePDF);
        toast.success('Payment successful. Ticket/Tickets downloaded');
        if (totalTickets + quantity >= 5) {
          setCanPurchase(false);
        }
        setTicketPurchased(true);
      }
    } else {
      // User is not signed in, show a toast
      toast.error('You must be signed in to make a payment.');
    }
    setLoading(false);
  };

  if (!activity) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <GlobalStyles />
      <Navbar />
      <ActivityContainer>
        <ImageContainer>
          <Image src={activity.images[0]} alt={`${activity.title} ${activity.images[0]}`} />
        </ImageContainer>
        <TitleContainer>
          <TitleText>{activity.title}</TitleText>
          <TitleBorder />
        </TitleContainer>
        <InfoContainer>
          <DescriptionContainer>
            <Description>
              <p>{activity.description}</p>
            </Description>
            <Note>
            Please after purchase wait few seconds. PDF ticket/tickets will be downloaded
            </Note>
            <HighlightsContainer>
              {activity.highlights.map((highlight, index) => (
                <Highlight key={index}>{highlight}</Highlight>
              ))}
            </HighlightsContainer>
          </DescriptionContainer>
          {!loading && canPurchase && !ticketPurchased && activity && localStorage.getItem(`totalTickets_${id}`) !== '5' && (
            <FormContainer
              title={activity.title}
              date={activity.date}
              price={activity.price}
              location={activity.location}
              onAddToCart={(quantity, totalPrice) => handleAddToCart(quantity, totalPrice)}
            />
          )}
          {loading && <p></p>}
          {(!canPurchase || localStorage.getItem(`totalTickets_${id}`) === '5') && (
            <div>
              <p>Thank you for your purchase!</p>
              <p>You have reached your limit of tickets for this event!</p>
            </div>
          )}
          {ticketPurchased && (
            <AddToCartButton onClick={() => downloadActivityPDF(activity, ticketId, quantity, qrCodeRef, setQrValuePDF)}>
              Download PDF
            </AddToCartButton>
          )}
        </InfoContainer>
      </ActivityContainer>
      <Map
        iconUrl={'https://cdn-icons-png.flaticon.com/512/1072/1072365.png'}
        coordinates={activity.coordinates}
        location={activity.location}
        title={activity.title}
      />
      <Footer />
      <div ref={qrCodeRef} style={{ display: 'none' }}>
        <QRCode value={qrValuePDF} />
      </div>
    </>
  );
};

export default ActivityOverview;
