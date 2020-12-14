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

/*
 *function App() {
 *  return (
 *    <div className="App">
 *      <header className="App-header">
 *        <SignInForm />
 *        <img src={logo} className="App-logo" alt="logo" />
 *        <p>
 *          Code <code>src/App.js</code> can be seen here.
 *        </p>
 *        <a
 *          className="App-link"
 *          href="https://reactjs.org"
 *          target="_blank"
 *          rel="noopener noreferrer"
 *        >
 *          Learn React
 *        </a>
 *      </header>
 *    </div>
 *  );
 *}
 */

export default App;
