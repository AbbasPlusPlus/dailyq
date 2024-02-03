import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./forgotPassword.styles";

export function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <S.StyledCard>
        <S.CardBody>
          <S.Title>Password Reset</S.Title>
          {error && <S.StyledAlert variant="danger">{error}</S.StyledAlert>}
          {message && (
            <S.StyledAlert variant="success">{message}</S.StyledAlert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <S.StyledButton disabled={loading} type="submit">
              Reset Password
            </S.StyledButton>
          </Form>
          <S.Container>
            <S.Link to="/login">Login</S.Link>
          </S.Container>
        </S.CardBody>
      </S.StyledCard>
      <S.Container>
        Need an account? <S.Link to="/signup">Sign Up</S.Link>
      </S.Container>
    </>
  );
}
