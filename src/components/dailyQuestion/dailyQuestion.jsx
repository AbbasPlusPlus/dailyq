import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap"; // Import Bootstrap Alert component
import { useAuth } from "../../contexts/AuthContext";
import { saveUserAnswer } from "../../firebase/firestore";
import { useDailyQuestion } from "../../hooks/useDailyQuestion";
import * as S from "./dailyQuestion.styles";

export const DailyQuestion = () => {
  const question = useDailyQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [freeResponse, setFreeResponse] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const answeredToken = localStorage.getItem(
      `answered_${currentUser?.uid}_${question?.id}`
    );
    setHasAnswered(!!answeredToken);
  }, [currentUser, question]);

  if (!question) {
    return <div>Loading question...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasAnswered) {
      console.error("You have answered this question.");
      return;
    }
    if (selectedAnswer || freeResponse) {
      try {
        const answerId = await saveUserAnswer({
          questionId: question.id,
          answer: selectedAnswer,
          freeResponse,
          user: currentUser,
        });
        if (answerId) {
          localStorage.setItem(
            `answered_${currentUser?.uid}_${question.id}`,
            "answered"
          );
          setHasAnswered(true);
        }
      } catch (error) {
        console.error("Error saving the answer: ", error);
      }
    }
  };

  return (
    <>
      {hasAnswered && (
        <Alert variant="info">You have already answered this question.</Alert>
      )}
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
    </>
  );
};
