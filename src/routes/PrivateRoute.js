import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();
  const isAuthenticated = auth.user !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
