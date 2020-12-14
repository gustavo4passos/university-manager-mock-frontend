import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";

const PrivateRoute = ({ component: Component, allowed, ...rest }) => {
  const auth = useAuth();
  const isAuthenticated = auth.user !== null;
  const accessAllowed = allowed !== undefined ? allowed : true;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && accessAllowed ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
