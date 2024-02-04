import { Button, Container, FormControl } from "react-bootstrap";
import styled from "styled-components";

export const QuestionContainer = styled(Container)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const QuestionHeader = styled.h3`
  margin-bottom: 20px;
  text-align: center;
`;

export const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AnswerButton = styled(Button)`
  margin: 5px;
  width: 100%;
`;

export const FreeResponseInput = styled(FormControl)`
  margin-top: 10px;
  width: 100%;
  margin-left: 10px;
  border-radius: 4px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  margin-left: 10px;
  width: 100%;
`;

export const AnswerProgress = styled.div`
  margin-bottom: 10px;
  width: 100%;
  .progress-bar {
    transition: width 0.6s ease;
  }
`;
