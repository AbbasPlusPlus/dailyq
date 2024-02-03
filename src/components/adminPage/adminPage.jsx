import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheck, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { saveQuestion } from "../../firebase/firestore";
import * as S from "./adminPage.styles";

export function AdminPage() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);
  const [allowFreeResponse, setAllowFreeResponse] = useState(false);
  const [activateAt, setActivateAt] = useState(new Date());
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    if (successMessage) setSuccessMessage("");
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    if (successMessage) setSuccessMessage("");
  };

  const addAnswer = () => {
    if (answers.length < 5) {
      setAnswers([...answers, ""]);
    }
  };

  const removeAnswer = (index) => {
    if (answers.length > 2) {
      const newAnswers = answers.filter((_, idx) => idx !== index);
      setAnswers(newAnswers);
    }
  };

  const toggleFreeResponse = () => {
    setAllowFreeResponse(!allowFreeResponse);
  };

  const handleSaveQuestion = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      await saveQuestion(
        question,
        answers.filter((answer) => answer.trim()),
        allowFreeResponse,
        activateAt
      );
      setSuccessMessage("Question saved successfully!");
      setQuestion("");
      setAnswers(["", ""]);
      setAllowFreeResponse(false);
      setActivateAt(new Date());
    } catch (error) {
      console.error("Failed to save question: ", error);
      setValidationError("Failed to save the question. Please try again.");
    }
  };

  const validateForm = () => {
    setValidationError(""); // Reset validation error before checking
    if (!question.trim()) {
      setValidationError("Please enter a question.");
      return false;
    }
    if (answers.some((answer) => !answer.trim())) {
      setValidationError("All answers must be filled out.");
      return false;
    }
    if (answers.length < 2) {
      setValidationError("Please provide at least two answers.");
      return false;
    }
    return true;
  };
  return (
    <S.Container>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <h2>Add a New Question</h2>
      <S.Input
        type="text"
        placeholder="Enter your question here"
        value={question}
        onChange={handleQuestionChange}
      />
      <S.AnswerContainer>
        {answers.map((answer, index) => (
          <div key={index}>
            <S.Input
              type="text"
              placeholder={`Answer ${index + 1}`}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            {answers.length > 2 && (
              <S.RemoveButton onClick={() => removeAnswer(index)}>
                <FaTrash />
              </S.RemoveButton>
            )}
          </div>
        ))}
      </S.AnswerContainer>
      {answers.length < 5 && (
        <S.Button onClick={addAnswer}>
          <FaPlus /> Add Answer
        </S.Button>
      )}
      <S.Button $allow={allowFreeResponse} onClick={toggleFreeResponse}>
        {allowFreeResponse ? (
          <>
            <FaTimes /> Disallow Free Responses
          </>
        ) : (
          <>
            <FaCheck /> Allow Free Responses
          </>
        )}
      </S.Button>
      <div>
        <p>Activate At:</p>
        <DatePicker
          selected={activateAt}
          onChange={(date) => setActivateAt(date)}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date()}
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
        />
      </div>
      <S.Button onClick={handleSaveQuestion} disabled={!!validationError}>
        Save Question
      </S.Button>
    </S.Container>
  );
}
