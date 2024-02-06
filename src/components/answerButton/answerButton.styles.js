import { FaCheckCircle } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

export const AnswerButtonContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const TextAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const AnswerText = styled.span`
  margin-right: 5px;
`;

export const PercentageBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ isSelected }) => (isSelected ? "#e4f0fe" : "#ebebeb")};
  transition: width 0.3s ease-in-out;
`;

export const PercentageText = styled.span`
  position: absolute;
  right: 10px;
  z-index: 1;
  color: black;
`;

export const SelectedIcon = styled(FaCheckCircle)`
  color: dimgray;
  font-size: 20px;
  margin: 0 0 2px 8px;
`;

const sparkleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

export const Sparkle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: magenta;
  animation: ${sparkleAnimation} 0.7s ease-out forwards;
  pointer-events: none;
`;
