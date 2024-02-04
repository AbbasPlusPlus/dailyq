import React, { useState } from "react";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
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
            <Dropdown align="end">
              <Dropdown.Toggle variant="success" id="dropdown-settings">
                <FiSettings />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/update-profile")}>
                  Update Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </Navbar>
      <DailyQuestion />
    </S.Card>
  );
}
