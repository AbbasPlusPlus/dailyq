import { doc, setDoc } from "firebase/firestore";
import React, { useMemo, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import * as S from "./signup.styles";

export function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");

  const countryOptions = useMemo(() => countryList().getData(), []);

  const changeCountryHandler = (value) => {
    setCountry(value);
  };

  const { signup, signupWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const userCredential = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        country: country?.label,
        email: emailRef.current.value,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <S.Card>
        <S.CardBody>
          <S.Title>Sign Up</S.Title>
          {error && <S.Alert>{error}</S.Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="first-name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="last-name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="country">
              <Form.Label>Country</Form.Label>
              <Select
                options={countryOptions}
                value={country}
                onChange={changeCountryHandler}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <S.Button disabled={loading} type="submit">
              Sign Up
            </S.Button>
          </Form>
        </S.CardBody>
      </S.Card>
      <S.Container>
        Already have an account? <Link to="/login">Log In</Link>
      </S.Container>
      <S.Button
        disabled={loading}
        onClick={async (e) => {
          e.preventDefault();
          try {
            setError("");
            setLoading(true);
            await signupWithGoogle();
            navigate("/");
          } catch (error) {
            console.error(error);
            setError("Failed to sign up with Google");
            setLoading(false);
          }
        }}
      >
        Sign Up with Google
      </S.Button>
    </>
  );
}
