import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleIcon, StyledButton } from "./signInWithGoogle.styles";

export const SignInWithGoogle = ({ signup }) => {
  const { signupWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      await signupWithGoogle();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledButton onClick={handleSignInWithGoogle} className="d-block mb-3">
      <GoogleIcon /> {`Sign ${signup ? "up" : "in"} with Google`}
    </StyledButton>
  );
};
