import React from "react";
import { useAuth } from "../Auth";

const HomePage = () => {
  const auth = useAuth();

  console.log("opa,", auth);
  return <div>{`Bem vindo, ${auth.user.nome} ${auth.user.sobrenome}`}</div>;
};

export default HomePage;
