import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as S from "./dashboard.styles.js";

export function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <S.ProfileCard>
        <S.Container>
          <S.Title>Profile</S.Title>
          {error && <S.ErrorAlert>{error}</S.ErrorAlert>}
          <S.EmailText>Email: {currentUser.email}</S.EmailText>
          <S.UpdateProfileLink to="/update-profile">
            Update Profile
          </S.UpdateProfileLink>
        </S.Container>
      </S.ProfileCard>
      <S.Container>
        <S.LogoutButton onClick={handleLogout}>Log Out</S.LogoutButton>
      </S.Container>
    </>
  );
}
