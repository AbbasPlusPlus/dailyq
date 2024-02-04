import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchAnswersForQuestion,
  saveUserAnswer,
} from "../../firebase/firestore";
import { useDailyQuestion } from "../../hooks/useDailyQuestion";
import { AnswerButton } from "../answerButton";
import * as S from "./dailyQuestion.styles";

export const DailyQuestion = () => {
  const question = useDailyQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [freeResponse, setFreeResponse] = useState("");
  const [savedFreeResponse, setSavedFreeResponse] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answerFrequencies, setAnswerFrequencies] = useState({});
  const [totalAnswers, setTotalAnswers] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const answeredToken = localStorage.getItem(
      `answered_${currentUser?.uid}_${question?.id}`
    );
    const savedAnswer = localStorage.getItem(
      `selectedAnswer_${currentUser?.uid}_${question?.id}`
    );
    const freeResponse = localStorage.getItem(
      `freeResponse_${currentUser?.uid}_${question?.id}`
    );

    setHasAnswered(!!answeredToken);
    setSelectedAnswer(savedAnswer || null);
    setSavedFreeResponse(freeResponse || "");

    if (answeredToken) {
      processAndDisplayAnswerFrequencies(question.id);
    }
  }, [currentUser, question]);

  const processAndDisplayAnswerFrequencies = async (questionId) => {
    try {
      const answers = await fetchAnswersForQuestion(questionId);
      const frequency = answers.reduce((acc, answer) => {
        acc[answer.answer] = (acc[answer.answer] || 0) + 1;
        return acc;
      }, {});

      setTotalAnswers(answers.length);
      setAnswerFrequencies(frequency);
    } catch (error) {
      console.error("Error fetching answers: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasAnswered) {
      console.error("You have already answered this question.");
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
          localStorage.setItem(
            `selectedAnswer_${currentUser?.uid}_${question.id}`,
            selectedAnswer
          );
          localStorage.setItem(
            `freeResponse_${currentUser?.uid}_${question.id}`,
            freeResponse
          );
          setHasAnswered(true);
          setSavedFreeResponse(freeResponse);
          processAndDisplayAnswerFrequencies(question.id);
        }
      } catch (error) {
        console.error("Error saving the answer: ", error);
      }
    }
  };

  if (!question) {
    return <div>Loading question...</div>;
  }

  return (
    <>
      {hasAnswered && (
        <Alert variant="info">
          Thank you for your input! Come back tomorrow for the next question.
        </Alert>
      )}
      <S.QuestionContainer as="form" onSubmit={handleSubmit}>
        <S.QuestionHeader>{question.question}</S.QuestionHeader>
        <S.AnswerList>
          {question.answers.map((answer, index) => {
            const frequency = answerFrequencies[answer] || 0;
            const percentage =
              totalAnswers > 0 ? (frequency / totalAnswers) * 100 : 0;

            return (
              <AnswerButton
                key={index}
                text={answer}
                isSelected={selectedAnswer === answer}
                percentage={hasAnswered ? percentage : 0}
                onClick={() => !hasAnswered && setSelectedAnswer(answer)}
              />
            );
          })}
        </S.AnswerList>
        {question.allowFreeResponse &&
          (hasAnswered ? (
            savedFreeResponse && (
              <S.ResponseDisplay>{savedFreeResponse}</S.ResponseDisplay>
            )
          ) : (
            <S.FreeResponseInput
              as="textarea"
              rows={3}
              maxLength={250}
              placeholder="Additional comments"
              value={freeResponse}
              onChange={(e) => setFreeResponse(e.target.value)}
            />
          ))}
        {!hasAnswered && <S.SubmitButton type="submit">Submit</S.SubmitButton>}

        {hasAnswered && !currentUser && (
          <S.AuthButtonContainer>
            <p>Please login or signup to see how other users answered.</p>
            <Button
              variant="primary"
              className="mx-3"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button variant="secondary" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </S.AuthButtonContainer>
        )}
      </S.QuestionContainer>
    </>
  );
};
