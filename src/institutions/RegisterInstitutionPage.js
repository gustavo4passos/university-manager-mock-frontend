import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import * as requestUtils from "../utils/Requests";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Alert from "../utils/Alert";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  registerButton: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: 60,
  },
}));

const RegisterInstitutionPage = () => {
  const [institution, setInstitution] = useState({
    name: "",
    address: "",
    visible: 1,
    city: "",
    state: "",
    credentials: "",
    mantainer: "",
    type: "",
    visible: true,
  });

  const [formReady, setFormReady] = useState(false);
  const [buttonText, setButtonText] = useState("Cadastrar");
  const [title, setTitle] = useState("Criar Instituição");
  const [update, setUpdate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const params = useParams();

  const registerInstitution = () => {
    axios
      .put(
        `http://localhost:5000/inst/0`,
        requestUtils.objectToFormData({
          nome: institution.name,
          endereco: institution.address,
          cidade: institution.city,
          estado: institution.state,
          credenciamento: institution.credentials,
          mantenedora: institution.mantainer,
          inst_type: "empty",
          visivel: institution.visible ? 1 : 0,
        }),
        {
          headers: {
            authorization: "1",
          },
        }
      )
      .then((response) => {
        setAlertMessage("Instituição criada com sucesso.");
        setShowAlert(true);
      })
      .catch((response) => {
        setAlertMessage("Nao foi possivel criar instituição.");
        setShowAlert(true);
      });
  };

  const updateInstitution = () => {
    requestUtils.updateInstitution(
      params.id,
      {
        id: params.id,
        nome: institution.name,
        endereco: institution.address,
        cidade: institution.city,
        estado: institution.state,
        credenciamento: institution.credentials,
        mantenedora: institution.mantainer,
        inst_type: "empty",
        visivel: institution.visible ? 1 : 0,
      },
      (response) => {
        setAlertMessage("Instituição atualizada com sucesso.");
        setShowAlert(true);
      },
      (response) => {
        setAlertMessage("Nao foi possivel atualizar instituição.");
        setShowAlert(true);
      }
    );
  };
  React.useEffect(() => {
    if (!params.id) setFormReady(true);
    else {
      setUpdate(true);
      setButtonText("Atualizar");
      setTitle("Atualizar Instituição");
      requestUtils.getInstitution(params.id, (inst) => {
        setInstitution({
          name: inst.nome,
          address: inst.endereco,
          city: inst.cidade,
          state: inst.estado,
          credentials: inst.credenciamento,
          mantainer: inst.mantenedora,
          visible: inst.visivel,
        });
      });
    }
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" className={classes.formContainer}>
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
          id="name"
          label="Nome"
          required
          value={institution.name}
          onChange={(event) => {
            setInstitution({ ...institution, name: event.target.value });
          }}
        />
        <TextField
          id="address"
          label="Endereço"
          value={institution.address}
          required
          onChange={(event) => {
            setInstitution({ ...institution, address: event.target.value });
          }}
        />
        <TextField
          id="city"
          label="Cidade"
          required
          value={institution.city}
          onChange={(event) => {
            setInstitution({ ...institution, city: event.target.value });
          }}
        />
        <TextField
          id="state"
          label="Estado"
          required
          value={institution.state}
          onChange={(event) => {
            setInstitution({ ...institution, state: event.target.value });
          }}
        />
        <TextField
          id="credentials"
          label="Credenciamento"
          required
          value={institution.credentials}
          onChange={(event) => {
            setInstitution({
              ...institution,
              credentials: event.target.value,
            });
          }}
        />
        <TextField
          id="mantainer"
          label="Mantenedora"
          required
          value={institution.mantainer}
          onChange={(event) => {
            setInstitution({ ...institution, mantainer: event.target.value });
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={institution.visible}
              onChange={(event, value) =>
                setInstitution({ ...institution, visible: value })
              }
              name="visible"
            />
          }
          value={institution.visible}
          label="Visível"
        />
        <Button
          className={classes.registerButton}
          color="primary"
          variant="contained"
          onClick={update ? updateInstitution : registerInstitution}
        >
          {buttonText}
        </Button>
      </form>
    </Paper>
  );
};

export default RegisterInstitutionPage;
