import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const updateUserDocument = async (userId, userData) => {
  try {
    const userDocRef = doc(db, "users", userId);

    await setDoc(userDocRef, userData);
  } catch (error) {
    throw new Error("Failed to update user document.");
  }
};

export const saveQuestion = async (
  question,
  answers,
  allowFreeResponse,
  activateAt
) => {
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      question,
      answers,
      allowFreeResponse,
      activateAt: activateAt.toISOString(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
