import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../../firebase'; // import your firebase instance
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { toast } from 'react-toastify';
import { FormEvent } from 'react';

interface FormValues {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    password: string;
    cardHolderName: string;
}

export const handleSubmit = async (event: FormEvent, formValues: FormValues, collectionName: string, docData: any, callback: () => void) => {
    event.preventDefault();
    const { cardNumber, expiryDate, cvv, password, cardHolderName } = formValues;
    
    if (!cardNumber.replace(/\s/g, '') || cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Invalid card number. Please enter a 16-digit card number.');
        return;
      }
      // Basic form validation
      if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
        toast.error('Invalid expiry date. Please enter in the format MM/YY.');
        return;
      }
  
      // Extracting year from expiry date
      if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/?(24)$/)) { // Ensuring year 2024
        toast.error('Invalid expiry date. Please enter in the format MM/YY');
        return;
      }
  
      if (!cvv || cvv.length !== 3) {
        toast.error('Invalid CVV. Please enter a 3-digit CVV.');
        return;
      }
      if (!password || password.length < 6) {
        toast.error('Invalid password. Please enter a password with at least 6 characters.');
        return;
      }
  
      if (!cvv || cvv.length !== 3) {
        toast.error('Invalid CVV. Please enter a 3-digit CVV.');
        return;
      }
  
      if (!cardHolderName.trim().includes(' ')) {
        toast.error('Invalid cardholder name. Please enter first and last name.');
        return;
      }
    
    // Check if the user is signed in and the email is not null
    if (auth.currentUser !== null && auth.currentUser.email !== null) {
        // Validate the user's password
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            formValues.password
        );
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(async () => {
                if (auth.currentUser) {
                    const collectionRef = collection(db, collectionName);
                    await addDoc(collectionRef, docData);
                    callback();
                } else {
                    toast.error('You must be signed in to make a reservation.');
                }
            })
            .catch(() => {
                // Password is incorrect, show a toast
                toast.error('Incorrect password. Please try again.');
            });
    } else {
        toast.error('You must be signed in to make a payment.');
    }
};