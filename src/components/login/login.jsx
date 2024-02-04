import React, { useState } from "react";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { OrSplitter } from "../orSplitter";
import { SignInWithGoogle } from "../signInWithGoogle";
import * as S from "./login.styles";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <S.Card>
        <Navbar expand="lg" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => navigate("/")}>
              <IoHomeOutline size="26" />
            </Nav.Link>
          </Nav>
        </Navbar>
        <S.CardBody>
          <S.Title>Log In</S.Title>
          {error && <Alert variant="danger">{error}</Alert>}
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

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={loading}
              className="w-100"
            >
              Log In
            </Button>
          </Form>
          <OrSplitter />
          <SignInWithGoogle />
          <S.Container>
            <Link to="/forgot-password">Forgot Password?</Link>
          </S.Container>
        </S.CardBody>
      </S.Card>
      <S.Container>
        Need an account? <Link to="/signup">Sign Up</Link>
      </S.Container>
    </>
  );
}
