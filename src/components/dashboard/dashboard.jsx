import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { DailyQuestion } from "../dailyQuestion";
import * as S from "./dashboard.styles";

export function Dashboard() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

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
    <S.Card>
      <Navbar expand="lg" className="justify-content-end">
        {currentUser && (
          <Nav>
            <Nav.Link onClick={handleLogout}>
              <IoLogOutOutline size="26" />
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
      <DailyQuestion />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </S.Card>
  );
}
