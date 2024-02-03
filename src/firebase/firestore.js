import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const updateUserDocument = async (userId, userData) => {
  try {
    const userDocRef = doc(db, "users", userId);

    await setDoc(userDocRef, userData);
  } catch (error) {
    throw new Error("Failed to update user document.");
  }
};
