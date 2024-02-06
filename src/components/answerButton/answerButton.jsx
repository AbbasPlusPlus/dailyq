import React from "react";
import { FaStar } from "react-icons/fa"; // Import the star icon from React Icons
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./answerButton.styles";

export const AnswerButton = ({ text, percentage, isSelected, ...props }) => {
  const { currentUser } = useAuth();

  return (
    <S.AnswerButtonContainer isSelected={isSelected} {...props}>
      <S.TextAndIconContainer>
        <S.AnswerText>{text}</S.AnswerText>
        {isSelected && <SelectedIconWithSparkles isSelected={isSelected} />}
      </S.TextAndIconContainer>
      {currentUser && (
        <S.PercentageBar percentage={percentage} isSelected={isSelected} />
      )}
      {currentUser && percentage > 0 && (
        <S.PercentageText>{`${percentage.toFixed(0)}%`}</S.PercentageText>
      )}
    </S.AnswerButtonContainer>
  );
};

export const SelectedIconWithSparkles = ({ isSelected }) => {
  const numSparkles = Math.floor(Math.random() * 25) + 5;

  const sparkles = [];
  for (let i = 0; i < numSparkles; i++) {
    const left = Math.random() * 100 + "%";
    const top = Math.random() * 100 + "%";
    sparkles.push(
      <S.Sparkle key={i} style={{ top, left }}>
        <FaStar />
      </S.Sparkle>
    );
  }

  return (
    <>
      {isSelected && sparkles}
      <S.SelectedIcon />
    </>
  );
};
