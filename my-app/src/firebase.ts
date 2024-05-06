import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAF68o80xRCE7zhnUOl__xtfpgafbdJN_0",
  authDomain: "city-app-fec40.firebaseapp.com",
  projectId: "city-app-fec40",
  storageBucket: "city-app-fec40.appspot.com",
  messagingSenderId: "5105736897",
  appId: "1:5105736897:web:3de92292e180973f4c0840",
  measurementId: "G-X613BL5QNK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };