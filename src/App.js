import "./App.css";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    margin: theme.spacing(2),
  },
}));
const SignInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

  const classes = useStyles();
  return (
    <form className="LoginContainer" noValidate autoComplete="off">
      <Typography variant="h1" component="h2" gutterBottom>
        Login
      </Typography>
      <TextField
        id="email"
        label="email"
        required
        type="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        id="password"
        label="password"
        type="password"
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button
        className={classes.signInButton}
        color="primary"
        variant="contained"
      >
        Entrar
      </Button>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignInForm />
      </header>
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
