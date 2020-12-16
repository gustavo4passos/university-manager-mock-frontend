import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";

const PrivateRoute = ({ component: Component, allowed, ...rest }) => {
  const auth = useAuth();
  const isAuthenticated = auth.user !== null;
  const accessAllowed = allowed !== undefined ? allowed : true;

  console.log("ist aht", isAuthenticated && accessAllowed);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && accessAllowed ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
