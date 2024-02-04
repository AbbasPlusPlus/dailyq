import React from "react";
import * as S from "./answerButton.styles";

export const AnswerButton = ({ text, percentage, isSelected, ...props }) => {
  return (
    <S.AnswerButtonContainer isSelected={isSelected} {...props}>
      <S.PercentageBar percentage={percentage} />
      <S.AnswerText>{text}</S.AnswerText>
      {percentage > 0 && (
        <S.PercentageText>{`${percentage.toFixed(0)}%`}</S.PercentageText>
      )}
    </S.AnswerButtonContainer>
  );
};
