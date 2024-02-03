import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import { Dashboard } from "../dashboard";
import { ForgotPassword } from "../forgotPassword";
import { Login } from "../login";
import { PrivateRoute } from "../privateRoute";
import { Signup } from "../signup";
import { UpdateProfile } from "../updateProfile";
import * as S from "./app.styles";

function App() {
  return (
    <S.MainContainer>
      <S.ContentContainer>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </S.ContentContainer>
    </S.MainContainer>
  );
}
