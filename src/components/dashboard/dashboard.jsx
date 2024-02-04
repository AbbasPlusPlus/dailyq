import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { DailyQuestion } from "../dailyQuestion";
import * as S from "./dashboard.styles.js";

export function Dashboard() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
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
        <DailyQuestion />

        <S.Container>
          {error && <S.ErrorAlert>{error}</S.ErrorAlert>}
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
