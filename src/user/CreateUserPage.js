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
import * as requestUtils from "../utils/Requests";
import Alert from "../utils/Alert";
import { withRouter, useParams } from "react-router-dom";

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
    "dirigente institucional",
    "superintendente",
    "coordenador",
    "funcionario",
  ];

  const [formReady, setFormReady] = useState(false);
  const [buttonText, setButtonText] = useState("Cadastrar");
  const [title, setTitle] = useState("Criar Usuário");
  const [update, setUpdate] = useState(false);

  const [institutions, setInstitutions] = useState(null);
  const [institution, setInstitution] = useState(-1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(positions[0]);
  const [cpf, setCpf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const auth = useAuth();
  const params = useParams();

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
        cpf,
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

  const updateUser = () => {
    requestUtils.updateUser(
      params.id,
      {
        id: params.id,
        inst_id: institution,
        username,
        email,
        nome: name,
        sobrenome: surname,
        telefone: phone,
        cargo: position,
        cpf,
      },
      (response) => {
        setAlertMessage("Usuario atualizado com sucesso.");
        setShowAlert(true);
      },
      (response) => {
        setAlertMessage("Nao foi possivel atualizar usuario.");
        setShowAlert(true);
      }
    );
  };

  React.useEffect(() => {
    requestUtils.authorizedGet(`http://localhost:5000/inst/all`, (response) => {
      setInstitutions(response.data);
    });

    if (!params.id) setFormReady(true);
    else {
      setUpdate(true);
      setButtonText("Atualizar");
      setTitle("Atualizar Usuário");
      requestUtils.getUser(params.id, (user) => {
        setInstitution(user.inst_id);
        setName(user.nome);
        setUsername(user.username);
        setPassword(user.password);
        setSurname(user.sobrenome);
        setEmail(user.email);
        setPhone(user.telefone);
        setPosition(user.cargo);
        setInstitution(user.inst_id);
        setCpf(user.cpf);
      });
    }
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
              {title}
            </Typography>
            {errorMessage !== "" ? <p>{errorMessage}</p> : <></>}
            <TextField
              id="username"
              label="Username"
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            {!update && (
              <TextField
                id="password"
                label="Senha"
                type="password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            )}
            <InputLabel>Cargo</InputLabel>
            <Select
              id="position-select"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
              value={position}
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
              value={institution}
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
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              id="surname"
              label="Sobrenome"
              required
              value={surname}
              onChange={(event) => {
                setSurname(event.target.value);
              }}
            />
            <TextField
              id="cpf"
              label="CPF"
              required
              value={cpf}
              onChange={(event) => {
                setCpf(event.target.value);
              }}
            />
            <TextField
              id="phone"
              label="Telefone"
              required
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
            <TextField
              id="email"
              label="Email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Button
              className={classes.signInButton}
              color="primary"
              variant="contained"
              onClick={update ? updateUser : createUser}
            >
              {buttonText}
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

export default withRouter(CreateUserPage);
