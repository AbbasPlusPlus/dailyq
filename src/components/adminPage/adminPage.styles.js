import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: ${(props) => (props.$allow ? "crimson" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 80%;
`;

export const RemoveButton = styled(Button)`
  width: 40px;
`;

export const Input = styled.input`
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  width: 80%;
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
