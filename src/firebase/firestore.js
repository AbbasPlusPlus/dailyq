import { endOfDay, startOfDay, subDays } from "date-fns";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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
      activateAt,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const toFirestoreTimestamp = (date) => Timestamp.fromDate(date);

export const fetchQuestion = async () => {
  const todayStart = toFirestoreTimestamp(startOfDay(new Date()));
  const todayEnd = toFirestoreTimestamp(endOfDay(new Date()));

  let q = query(
    collection(db, "questions"),
    where("activateAt", ">=", todayStart),
    where("activateAt", "<=", todayEnd),
    orderBy("activateAt", "desc"),
    limit(1)
  );

  let querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return {
      ...querySnapshot.docs[0].data(),
      id: querySnapshot.docs[0].id,
    };
  }

  const dayBefore = toFirestoreTimestamp(subDays(new Date(), 1));
  q = query(
    collection(db, "questions"),
    where("activateAt", "<", dayBefore),
    orderBy("activateAt", "desc"),
    limit(1)
  );

  querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return {
      ...querySnapshot.docs[0].data(),
      id: querySnapshot.docs[0].id,
    };
  }

  return null;
};

export const saveUserAnswer = async ({
  questionId,
  answer,
  freeResponse,
  user,
}) => {
  const userId = user ? user.uid : "anonymous";

  const docRef = await addDoc(collection(db, "answers"), {
    questionId,
    userId,
    answer,
    freeResponse,
    submittedAt: Timestamp.fromDate(new Date()),
  });

  return docRef.id;
};

export const fetchAnswersForQuestion = async (questionId) => {
  const answersQuery = query(
    collection(db, "answers"),
    where("questionId", "==", questionId)
  );

  const querySnapshot = await getDocs(answersQuery);
  return querySnapshot.docs.map((doc) => doc.data());
};
