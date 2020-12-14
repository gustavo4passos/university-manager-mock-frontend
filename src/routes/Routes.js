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

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CreateCoursePage from "../courses/CreateCoursePage";

const Routes = () => {
  return (
    <Router>
      <SideMenu />
      <Switch>
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/create-user" component={CreateUserPage} />
        <PrivateRoute exact path="/users" component={UsersPage} />
        <PrivateRoute exact path="/courses" component={CoursesPage} />
        <PrivateRoute
          exact
          path="/create-course"
          component={CreateCoursePage}
        />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/login">
          <SignInPage />
        </Route>
        <Route
          path="/register-institution"
          component={RegisterInstitutionPage}
        />
        <Route path="/institutions" component={InstitutionsPage} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
