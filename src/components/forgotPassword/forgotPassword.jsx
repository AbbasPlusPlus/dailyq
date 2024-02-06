import React, { useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./forgotPassword.styles";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <S.Card>
        <S.LogoWrapper onClick={() => navigate("/")}>
          <S.Logo src="/logo.png" alt="Logo" style={{ cursor: "pointer" }} />
        </S.LogoWrapper>
        <S.CardBody>
          <S.Title>Password Reset</S.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-100"
              size="lg"
            >
              Reset Password
            </Button>
          </Form>
          <S.Container>
            <Link to="/login">Login</Link>
          </S.Container>
        </S.CardBody>
      </S.Card>
      <S.Container>
        Need an account? <Link to="/signup">Sign Up</Link>
      </S.Container>
    </>
  );
}
