import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./login.styles";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <S.StyledCard>
        <S.CardBody>
          <S.Title>Log In</S.Title>
          {error && <S.StyledAlert>{error}</S.StyledAlert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <S.StyledButton disabled={loading} type="submit">
              Log In
            </S.StyledButton>
          </Form>
          <S.Container>
            <Link to="/forgot-password">Forgot Password?</Link>
          </S.Container>
        </S.CardBody>
      </S.StyledCard>
      <S.Container>
        Need an account? <Link to="/signup">Sign Up</Link>
      </S.Container>
    </>
  );
}
