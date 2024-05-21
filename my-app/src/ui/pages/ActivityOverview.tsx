// ProductOverview.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import GlobalStyles from '../atoms/GlobalStyles';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import FormContainer from '../organisms/FormContainer';
import { addDoc, collection } from 'firebase/firestore';
import { downloadActivityPDF } from '../pages/ActivityGeneration';
import QRCode from 'qrcode.react';
import Map from '../organisms/ActivityMap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../firebase';


const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`;

const InfoContainer = styled.div`
  width: 80%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const DescriptionContainer = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const Description = styled.div`
  padding: 1rem 0 0 0;
  line-height: 1.6;
`;

const AddToCartButton = styled.button`
  display:none;
`;

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

const TitleContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleText = styled.h1`
  color: #333;
  font-weight: normal;
  padding: 10px 0px 20px 20px;
`;

const TitleBorder = styled.hr`
  border: 0;
  height: 1px;
  background: #e3dddd;
  width: 100%;
`;

const HighlightsContainer = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

const Highlight = styled.li`
  margin: 0.5rem 0;
`;

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
            images: activityData.data().images || [], // Use an empty array as a fallback
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
    // Check if the user is signed in
    setLoading(true);
    if (auth.currentUser) {
      // User is signed in, proceed with the purchase
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
        console.log('Ticket created with ID: ', docRef.id);
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
