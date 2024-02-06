import { useFormik } from "formik";
import React from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { updateUserDocument } from "../../firebase/firestore";
import { OrSplitter } from "../orSplitter";
import { SignInWithGoogle } from "../signInWithGoogle";
import { validationSchema } from "../utils/signup";
import * as S from "./signup.styles";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const { email, password, firstName, lastName } = values;
      try {
        const userCredential = await signup(email, password);
        const user = userCredential.user;
        await updateUserDocument(user.uid, {
          firstName,
          lastName,
          email,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
        setErrors({ submit: "Failed to create an account. Please try again." });
      }
    },
  });

  return (
    <>
      <S.Card>
        <S.LogoWrapper onClick={() => navigate("/")}>
          <S.Logo src="/logo.png" alt="Logo" style={{ cursor: "pointer" }} />
        </S.LogoWrapper>
        <S.CardBody>
          <S.Title>Sign Up</S.Title>
          {formik.errors.submit && (
            <Alert variant="danger">{formik.errors.submit}</Alert>
          )}
          <Form onSubmit={formik.handleSubmit}>
            <FloatingLabel
              controlId="floatingFirstName"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingLastName"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="lastName"
                onBlur={formik.handleBlur}
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                onBlur={formik.handleBlur}
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                name="password"
                onBlur={formik.handleBlur}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingConfirmPassword"
              label="Password Confirmation"
              className="mb-3"
            >
              <Form.Control
                type="password"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                isInvalid={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              size="lg"
              disabled={formik.isSubmitting || !formik.isValid}
              className="w-100"
            >
              Sign Up
            </Button>

            <OrSplitter />
            <SignInWithGoogle signup={true} />
          </Form>
        </S.CardBody>
      </S.Card>
      <S.Container>
        Already have an account? <Link to="/login">Log In</Link>
      </S.Container>
    </>
  );
}
