import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
`;

export const Card = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
  padding: 1rem;
`;

export const CardBody = styled.div`
  padding: 1rem;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

export const Alert = styled.div`
  background-color: #f8d7da;
  color: #842029;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0.5rem;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
