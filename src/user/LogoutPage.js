import React from "react";
import { useAuth } from "../Auth";
import { Redirect } from "react-router-dom";

const LogoutPage = () => {
  const auth = useAuth();

  React.useEffect(() => {
    localStorage.removeItem("auth");
    auth.setUser(null);
  });

  return <>{auth.user === null && <Redirect to="/login" />}</>;
};

export default LogoutPage;
