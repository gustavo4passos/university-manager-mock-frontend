import "./CreateCoursePage.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as requestUtils from "../utils/Requests";
import Paper from "@material-ui/core/Paper";
import Alert from "../utils/Alert";
import { withRouter, useParams } from "react-router-dom";
import { useAuth } from "../Auth";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    margin: theme.spacing(2),
  },
  container: {
    padding: 60,
  },
}));

const CreateCoursePage = (props) => {
  const positions = [
    "dirigente",
    "superintendente",
    "coordenador",
    "funcionario",
  ];

  const user = useAuth().user;
  const params = useParams();
  const institutionId = user ? user.inst_id : 1;

  const [course, setCourse] = useState({
    nome: "",
    ato_auto: "",
    ato_reco: "",
    ato_reno: "",
    codigo_emec: "",
    obs: "",
    inst_id: institutionId,
    renov: "",
  });

  const [formReady, setFormReady] = useState(false);
  const [buttonText, setButtonText] = useState("Cadastrar");
  const [title, setTitle] = useState("Criar Curso");
  const [update, setUpdate] = useState(false);

  const [institutions, setInstitutions] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

    if (!params.id) setFormReady(true);
    else {
      setUpdate(true);
      setButtonText("Atualizar");
      setTitle("Atualizar Curso");
      requestUtils.getCourse(params.id, (course) => {
        setCourse(course);
      });
    }
  }, []);

  const updateCourse = () => {
    requestUtils.updateCourse(
      params.id,
      {
        ...course,
        id: params.id,
      },
      (response) => {
        setAlertMessage("Curso atualizado com sucesso.");
        setShowAlert(true);
      },
      (response) => {
        setAlertMessage("Nao foi possivel atualizar curso.");
        setShowAlert(true);
      }
    );
  };

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
            <TextField
              id="nome"
              label="Nome do Curso"
              value={course.nome}
              required
              onChange={(event) => {
                setCourse({ ...course, nome: event.target.value });
              }}
            />
            <TextField
              id="grau"
              label="Grau"
              required
              value={course.grau}
              onChange={(event) => {
                setCourse({ ...course, grau: event.target.value });
              }}
            />
            <InputLabel>Instituição</InputLabel>
            <Select
              id="institution-select"
              value={course.inst_id}
              onChange={(event) => {
                setCourse({ ...course, inst_id: event.target.value });
              }}
              value={institutionId}
            >
              <MenuItem
                id={institutions[institutionId].id}
                value={institutions[institutionId].id}
              >
                {institutions[institutionId].nome}
              </MenuItem>
            </Select>

            <TextField
              id="codigo_emec"
              label="Código - MEC"
              value={course.codigo_emec}
              required
              onChange={(event) => {
                setCourse({ ...course, codigo_emec: event.target.value });
              }}
            />
            <TextField
              id="obs"
              label="Observação"
              required
              value={course.obs}
              onChange={(event) => {
                setCourse({ ...course, obs: event.target.value });
              }}
            />
            <TextField
              id="ato_reno"
              label="Ato de Renovação"
              required
              value={course.ato_reno}
              onChange={(event) => {
                setCourse({ ...course, ato_reno: event.target.value });
              }}
            />
            <TextField
              id="renov"
              label="Renovação"
              value={course.renov}
              required
              onChange={(event) => {
                setCourse({ ...course, renov: event.target.value });
              }}
            />
            <TextField
              id="ato_reco"
              label="Ato de Reconhecimento"
              value={course.ato_reco}
              required
              onChange={(event) => {
                setCourse({ ...course, ato_reco: event.target.value });
              }}
            />
            <TextField
              id="ato_reco"
              label="Ato de Autorização"
              required
              value={course.ato_auto}
              onChange={(event) => {
                setCourse({ ...course, auto_ato: event.target.value });
              }}
            />
            <Button
              className={classes.signInButton}
              color="primary"
              variant="contained"
              onClick={update ? updateCourse : createCourse}
            >
              {buttonText}
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

export default withRouter(CreateCoursePage);
