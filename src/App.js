import "./App.css";
import React from "react";
import Routes from "./routes/Routes";
import { AuthContext } from "./Auth";
import { useState } from "react";
require("dotenv").config();

function App() {
  const [user, setUser] = useState(null);

  const auth = {
    user: user,
    setUser: (user) => {
      setUser(user);
    },
  };

  React.useEffect(() => {
    // Checks if user is logged in
    const auth = localStorage.getItem("auth");
    if (auth !== null) setUser(JSON.parse(auth));
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={auth}>
        <header className="App-header">
          <Routes />
        </header>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
