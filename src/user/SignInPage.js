import "./SignInPage.css";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { useAuth } from "../Auth";
import { Redirect } from "react-router-dom";
import axios from "axios";
import * as requestUtils from "../utils/Requests";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    margin: theme.spacing(2),
  },
  container: {
    padding: 60,
  },
}));

const SignInPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const auth = useAuth();

  const login = () => {
    if (email !== "" && password !== "") {
      axios({
        method: "post",
        url: "http://localhost:5000/login",
        headers: { "Content-Type": "multipart/form-data" },
        data: requestUtils.objectToFormData({
          username: email,
          password: password,
        }),
      })
        .then((response) => {
          localStorage.setItem("auth", JSON.stringify(response.data));
          auth.setUser(response.data);
        })
        .catch((response) => {
          setErrorMessage("Erro");
        });
    }
  };
  const classes = useStyles();

  if (auth.user) return <Redirect to="/home" />;

  return (
    <Paper className={classes.container}>
      <form className="LoginContainer" noValidate autoComplete="off">
        <Typography variant="h3" component="h3" gutterBottom>
          Login
        </Typography>
        {errorMessage !== "" ? <p>{errorMessage}</p> : <></>}
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
          onClick={login}
        >
          Entrar
        </Button>
      </form>
    </Paper>
  );
};

export default SignInPage;
