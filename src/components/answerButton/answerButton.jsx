import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./answerButton.styles";

export const AnswerButton = ({ text, percentage, isSelected, ...props }) => {
  const { currentUser } = useAuth();

  return (
    <S.AnswerButtonContainer isSelected={isSelected} {...props}>
      {currentUser && <S.PercentageBar percentage={percentage} />}
      <S.AnswerText>{text}</S.AnswerText>
      {currentUser && percentage > 0 && (
        <S.PercentageText>{`${percentage.toFixed(0)}%`}</S.PercentageText>
      )}
    </S.AnswerButtonContainer>
  );
};
