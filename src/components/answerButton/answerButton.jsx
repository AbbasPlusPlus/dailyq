import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./answerButton.styles";

export const AnswerButton = ({ text, percentage, isSelected, ...props }) => {
  const { currentUser } = useAuth();

  return (
    <S.AnswerButtonContainer isSelected={isSelected} {...props}>
      <S.TextAndIconContainer>
        <S.AnswerText>{text}</S.AnswerText>
        {isSelected && <S.SelectedIcon />}
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
