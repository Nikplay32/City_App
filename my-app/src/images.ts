import { getDownloadURL, getStorage } from "firebase/storage";
import { ref } from "firebase/storage";

const storage = getStorage();

export const locationPinUrl = getDownloadURL(ref(storage, 'images/location-pin.png'));
export const landmarkUrl = getDownloadURL(ref(storage, 'images/landmark.png'));