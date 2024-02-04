import React, { useEffect, useState } from "react";
import { Alert, ProgressBar } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchAnswersForQuestion,
  saveUserAnswer,
} from "../../firebase/firestore";
import { useDailyQuestion } from "../../hooks/useDailyQuestion";
import * as S from "./dailyQuestion.styles";

export const DailyQuestion = () => {
  const question = useDailyQuestion();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [freeResponse, setFreeResponse] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answerFrequencies, setAnswerFrequencies] = useState({});
  const [totalAnswers, setTotalAnswers] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    const answeredToken = localStorage.getItem(
      `answered_${currentUser?.uid}_${question?.id}`
    );
    setHasAnswered(!!answeredToken);
    if (answeredToken) {
      processAndDisplayAnswerFrequencies(question.id);
    }
  }, [currentUser, question]);

  if (!question) {
    return <div>Loading question...</div>;
  }

  const processAndDisplayAnswerFrequencies = async (questionId) => {
    try {
      const answers = await fetchAnswersForQuestion(questionId);
      const frequency = answers.reduce((acc, answer) => {
        acc[answer.answer] = (acc[answer.answer] || 0) + 1;
        return acc;
      }, {});

      const total = answers.length;
      setTotalAnswers(total);
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
          setHasAnswered(true);
          processAndDisplayAnswerFrequencies(question.id);
        }
      } catch (error) {
        console.error("Error saving the answer: ", error);
      }
    }
  };

  return (
    <>
      {hasAnswered && (
        <Alert variant="info">
          You have answered this question. Come back tomorrow for the next one.
        </Alert>
      )}
      <S.QuestionContainer as="form" onSubmit={handleSubmit}>
        <S.QuestionHeader>{question.question}</S.QuestionHeader>
        <S.AnswerList>
          {question.answers.map((answer, index) => {
            const frequency = answerFrequencies[answer] || 0;
            const percentage =
              totalAnswers > 0 ? (frequency / totalAnswers) * 100 : 0;

            return hasAnswered ? (
              <S.AnswerProgress variant="secondary">
                <ProgressBar
                  now={percentage}
                  label={`${frequency} vote`}
                  striped={selectedAnswer === answer}
                  variant={selectedAnswer === answer ? "primary" : "secondary"}
                />
              </S.AnswerProgress>
            ) : (
              <S.AnswerButton
                variant="outline-primary"
                key={index}
                onClick={() => setSelectedAnswer(answer)}
                active={selectedAnswer === answer}
              >
                {answer}
              </S.AnswerButton>
            );
          })}
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
