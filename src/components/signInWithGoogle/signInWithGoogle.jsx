import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleIcon, StyledButton } from "./signInWithGoogle.styles";

export const SignInWithGoogle = ({ signup }) => {
  const { signupWithGoogle } = useAuth();

  return (
    <StyledButton onClick={signupWithGoogle} className="d-block">
      <GoogleIcon /> {`Sign ${signup ? "up" : "in"} with Google`}
    </StyledButton>
  );
};
