import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, setPersistence, browserLocalPersistence } from 'firebase/auth';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);

          if (user) {
            Cookies.set('userEmail', user.email || '');
          } else {
            Cookies.remove('userEmail');
          }
        });

        return unsubscribe;
      });
  }, []);

  return { currentUser, loading };
};

export default useAuth;