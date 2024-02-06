import { Nav } from "react-bootstrap";
import styled from "styled-components";

export const Card = styled.div`
  margin: auto;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  background-color: white;
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

export const Logo = styled.img`
  height: 150px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
