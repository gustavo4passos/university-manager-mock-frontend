import "./CreateCoursePage.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useAuth } from "../Auth";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as requestUtils from "../utils/Requests";
import Alert from "../utils/Alert";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    margin: theme.spacing(2),
  },
}));

const CreateCoursePage = (props) => {
  const positions = [
    "dirigente",
    "superintendente",
    "coordenador",
    "funcionario",
  ];
  const [course, setCourse] = useState({
    nome: "",
    ato_auto: "",
    ato_reco: "",
    ato_reno: "",
    codigo_emec: "",
    obs: "",
    inst_id: -1,
    renov: "",
  });

  const [institutions, setInstitutions] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const auth = useAuth();

  const createCourse = () => {
    requestUtils.authorizedPut(
      "http://localhost:5000/curs/0",
      course,
      (response) => {
        setAlertMessage("Curso criado com sucesso.");
        setShowAlert(true);
      },
      (response) => {
        setAlertMessage("Nao foi possivel criar o curso.");
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
        <form className="LoginContainer" noValidate autoComplete="off">
          <Alert
            severity="success"
            message={alertMessage}
            open={showAlert}
            handleClose={() => setShowAlert(false)}
          />
          <Typography variant="h3" component="h3" gutterBottom>
            Criar Curso
          </Typography>
          <TextField
            id="nome"
            label="Nome do Curso"
            required
            onChange={(event) => {
              setCourse({ ...course, nome: event.target.value });
            }}
          />
          <TextField
            id="grau"
            label="Grau"
            required
            onChange={(event) => {
              setCourse({ ...course, grau: event.target.value });
            }}
          />
          <InputLabel>Instituição</InputLabel>
          <Select
            id="institution-select"
            onChange={(event) => {
              console.log(event.target.value);
              setCourse({ ...course, inst_id: event.target.value });
            }}
          >
            {Object.keys(institutions).map((i) => (
              <MenuItem id={institutions[i].id} value={institutions[i].id}>
                {institutions[i].nome}
              </MenuItem>
            ))}
          </Select>

          <TextField
            id="codigo_emec"
            label="Código - MEC"
            required
            onChange={(event) => {
              setCourse({ ...course, codigo_emec: event.target.value });
            }}
          />
          <TextField
            id="obs"
            label="Observação"
            required
            onChange={(event) => {
              setCourse({ ...course, obs: event.target.value });
            }}
          />
          <TextField
            id="ato_reno"
            label="Ato de Renovação"
            required
            onChange={(event) => {
              setCourse({ ...course, ato_reno: event.target.value });
            }}
          />
          <TextField
            id="renov"
            label="Renovação"
            required
            onChange={(event) => {
              setCourse({ ...course, renov: event.target.value });
            }}
          />
          <TextField
            id="ato_reco"
            label="Ato de Reconhecimento"
            required
            onChange={(event) => {
              setCourse({ ...course, ato_reco: event.target.value });
            }}
          />
          <TextField
            id="ato_reco"
            label="Ato de Autorização"
            required
            onChange={(event) => {
              setCourse({ ...course, auto_auto: event.target.value });
            }}
          />
          <Button
            className={classes.signInButton}
            color="primary"
            variant="contained"
            onClick={createCourse}
          >
            Cadastrar
          </Button>
        </form>
      )}
    </>
  );
};

export default withRouter(CreateCoursePage);
