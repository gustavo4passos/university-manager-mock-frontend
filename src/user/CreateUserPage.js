import "./SignInPage.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useAuth } from "../Auth";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import axios from "axios";
import * as requestUtils from "../utils/Requests";
import Alert from "../utils/Alert";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    margin: theme.spacing(2),
  },
  container: {
    padding: 60,
  },
}));

const CreateUserPage = (props) => {
  const positions = [
    "dirigente",
    "superintendente",
    "coordenador",
    "funcionario",
  ];

  const [institutions, setInstitutions] = useState(null);
  const [institution, setInstitution] = useState(-1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(positions[0]);
  const [errorMessage, setErrorMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const auth = useAuth();

  const createUser = () => {
    requestUtils.authorizedPut(
      "http://localhost:5000/user/0",
      {
        inst_id: institution,
        username,
        password,
        email,
        nome: name,
        sobrenome: surname,
        telefone: phone,
        cargo: position,
      },
      (response) => {
        setAlertMessage("Usuario criado com sucesso.");
        setShowAlert(true);
      },
      (response) => {
        setAlertMessage("Nao foi possivel criar usuario.");
        setShowAlert(true);
      }
    );
  };

  React.useEffect(() => {
    requestUtils.authorizedGet(`http://localhost:5000/inst/all`, (response) => {
      setInstitutions(response.data);
    });
  }, []);

  const classes = useStyles();
  return (
    <>
      {institutions !== null && (
        <Paper className={classes.container}>
          <form className="LoginContainer" noValidate autoComplete="off">
            <Alert
              severity="success"
              message={alertMessage}
              open={showAlert}
              handleClose={() => setShowAlert(false)}
            />
            <Typography variant="h3" component="h3" gutterBottom>
              Criar Usuário
            </Typography>
            {errorMessage !== "" ? <p>{errorMessage}</p> : <></>}
            <TextField
              id="username"
              label="Username"
              required
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              id="password"
              label="Senha"
              type="password"
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputLabel>Cargo</InputLabel>
            <Select
              id="position-select"
              onChange={(event) => {
                console.log(event.target.value);
                setPosition(event.target.value);
              }}
            >
              {positions.map((p) => (
                <MenuItem id={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
            <InputLabel>Instituição</InputLabel>
            <Select
              id="institution-select"
              onChange={(event) => {
                console.log(event.target.value);
                setInstitution(event.target.value);
              }}
            >
              {Object.keys(institutions).map((i) => (
                <MenuItem id={institutions[i].id} value={institutions[i].id}>
                  {institutions[i].nome}
                </MenuItem>
              ))}
            </Select>
            <TextField
              id="name"
              label="Nome"
              required
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              id="surname"
              label="Sobrenome"
              required
              onChange={(event) => {
                setSurname(event.target.value);
              }}
            />
            <TextField
              id="phone"
              label="Telefone"
              required
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
            <TextField
              id="email"
              label="Email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Button
              className={classes.signInButton}
              color="primary"
              variant="contained"
              onClick={createUser}
            >
              Cadastrar
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

export default withRouter(CreateUserPage);
