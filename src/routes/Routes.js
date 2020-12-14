import React from "react";

// Pages
import SignInPage from "../user/SignInPage";
import RegisterInstitutionPage from "../institutions/RegisterInstitutionPage";
import InstitutionsPage from "../institutions/InstitutionsPage";
import CoursesPage from "../courses/CoursesPage";
import HomePage from "../home/HomePage";
import CreateUserPage from "../user/CreateUserPage";
import SideMenu from "../home/SideMenu";
import UsersPage from "../user/UsersPage";
import LogoutPage from "../user/LogoutPage";
import { useAuth } from "../Auth";
import * as permissions from "../utils/Permissions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CreateCoursePage from "../courses/CreateCoursePage";

const Routes = () => {
  const auth = useAuth();

  return (
    <Router>
      <SideMenu />
      <Switch>
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute
          exact
          path="/create-user"
          component={CreateUserPage}
          allowed={permissions.canManageUsers(auth.user)}
        />
        <PrivateRoute
          exact
          path="/users"
          component={UsersPage}
          allowed={permissions.canManageUsers(auth.user)}
        />
        <PrivateRoute exact path="/courses" component={CoursesPage} />
        <Route exact path="/update-user/:id">
          <CreateUserPage />
        </Route>
        <Route exact path="/update-institution/:id">
          <RegisterInstitutionPage />
        </Route>
        <PrivateRoute
          exact
          path="/create-course"
          component={CreateCoursePage}
        />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/login">
          <SignInPage />
        </Route>
        <PrivateRoute
          path="/register-institution"
          allowed={permissions.canCreateInstitution(auth.user)}
          component={RegisterInstitutionPage}
        />
        <Route path="/institutions" component={InstitutionsPage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
