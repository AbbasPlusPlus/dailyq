import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export const ProfileCard = styled.div`
  margin: auto;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const ErrorAlert = styled.div`
  background-color: #f8d7da;
  color: #842029;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
`;

export const EmailText = styled.strong`
  display: block;
`;

export const UpdateProfileLink = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 0.375rem 0.75rem;
  margin-top: 1rem;
  display: block;
  width: 100%;
  text-align: center;
  border-radius: 0.25rem;
  text-decoration: none;
`;

export const LogoutButton = styled.button`
  color: #007bff;
  background-color: transparent;
  border: none;
  padding: 0.375rem 0.75rem;
  margin-top: 0.5rem;
`;
