import { useEffect, useState } from "react";
import { fetchQuestion } from "../firebase/firestore";

export const useDailyQuestion = () => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await fetchQuestion();
        setQuestion(question);
      } catch (error) {
        console.error("Error fetching daily question:", error);
      }
    };

    fetchData();
  }, []);

  return question;
};
