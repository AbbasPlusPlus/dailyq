import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import { GlobalStyle } from "../../styles/GlobalStyle.";
import { AdminPage } from "../adminPage";
import { Dashboard } from "../dashboard";
import { ForgotPassword } from "../forgotPassword";
import { Login } from "../login";
import { Signup } from "../signup";
import { UpdateProfile } from "../updateProfile";
import * as S from "./app.styles";

const PrivateWrapper = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export function App() {
  return (
    <S.MainContainer>
      <GlobalStyle />
      <S.ContentContainer>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateWrapper>
                    <Dashboard />
                  </PrivateWrapper>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateWrapper>
                    <UpdateProfile />
                  </PrivateWrapper>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/admin"
                element={
                  <PrivateWrapper>
                    <AdminPage />
                  </PrivateWrapper>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </S.ContentContainer>
    </S.MainContainer>
  );
}
