import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Cookies from 'js-cookie';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<{ user: User | null, isAdmin: boolean | null, emailVerified: boolean | null }>({ user: null, isAdmin: null, emailVerified: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            fetchUserData(user);
          } else {
            setCurrentUser({ user: null, isAdmin: null, emailVerified: null });
            Cookies.remove('userEmail');
            setLoading(false);
          }
        });

        return unsubscribe;
      });

      async function fetchUserData(user: User) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
      
        console.log(docSnap.data()); // Log the entire document snapshot
      
        if (docSnap.exists()) {
          const userData = { 
            user, 
            isAdmin: docSnap.data().isAdmin, 
            emailVerified: user.emailVerified 
          };
          setCurrentUser(userData);
      
          // Log the user data
          console.log(userData);
        } else {
          console.log('No such document!');
        }
      
        Cookies.set('userEmail', user.email || '');
        setLoading(false);
      }
  }, []);

  return { currentUser, loading };
};

export default useAuth;