import { Nav } from "react-bootstrap";
import styled from "styled-components";

export const Card = styled.div`
  margin: auto;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const StyledNav = styled(Nav)`
  width: 100%;
  margin-bottom: 1rem;
`;
