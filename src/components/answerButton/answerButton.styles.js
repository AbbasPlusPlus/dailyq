import styled from "styled-components";

export const AnswerButtonContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: ${({ isSelected }) =>
    isSelected ? "5px solid DodgerBlue" : "1px solid #ccc"};
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const AnswerText = styled.span`
  z-index: 1;
`;

export const PercentageBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ percentage }) => percentage}%;
  background-color: DeepSkyBlue;
  transition: width 0.3s ease-in-out;
`;

export const PercentageText = styled.span`
  position: absolute;
  right: 10px;
  z-index: 1;
  color: black;
`;
