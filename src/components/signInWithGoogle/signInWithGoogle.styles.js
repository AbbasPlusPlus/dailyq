import { Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import styled from "styled-components";

export const StyledButton = styled(Button).attrs({
  variant: "secondary",
  size: "lg",
})`
  width: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const GoogleIcon = styled(FaGoogle)``;
