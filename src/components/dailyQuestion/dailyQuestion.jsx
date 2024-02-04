import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { saveUserAnswer } from "../../firebase/firestore";
import { useDailyQuestion } from "../../hooks/useDailyQuestion";
import * as S from "./dailyQuestion.styles";

export const DailyQuestion = () => {
  const question = useDailyQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [freeResponse, setFreeResponse] = useState("");
  const { currentUser } = useAuth();

  if (!question) {
    return <div>Loading question...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedAnswer || freeResponse) {
      try {
        await saveUserAnswer({
          questionId: question.id,
          answer: selectedAnswer,
          freeResponse: freeResponse,
          user: currentUser,
        });
      } catch (error) {
        console.error("Error saving the answer: ", error);
      }
    }
  };

  return (
    <S.QuestionContainer as="form" onSubmit={handleSubmit}>
      <S.QuestionHeader>{question.question}</S.QuestionHeader>
      <S.AnswerList>
        {question.answers.map((answer, index) => (
          <S.AnswerButton
            variant="outline-primary"
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            active={selectedAnswer === answer}
          >
            {answer}
          </S.AnswerButton>
        ))}
      </S.AnswerList>
      {question.allowFreeResponse && (
        <>
          <S.FreeResponseInput
            as="textarea"
            rows={3}
            maxLength="250"
            placeholder="Additional comments"
            value={freeResponse}
            onChange={(e) => setFreeResponse(e.target.value)}
          />
          <S.SubmitButton type="submit">Submit</S.SubmitButton>
        </>
      )}
    </S.QuestionContainer>
  );
};
