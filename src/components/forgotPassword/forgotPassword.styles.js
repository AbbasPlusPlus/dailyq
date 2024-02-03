import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
`;

export const StyledCard = styled.div`
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

export const StyledAlert = styled.div`
  background-color: ${(props) =>
    props.variant === "danger" ? "#f8d7da" : "#d4edda"};
  color: ${(props) => (props.variant === "danger" ? "#842029" : "#155724")};
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;

export const StyledButton = styled.button`
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

export const Link = styled(RouterLink)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
