import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import * as requestUtils from "../utils/Requests";
import { useState, useEffect } from "react";
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
    "*": {
      marginBottom: "2px",
    },
  },
  registerButton: {
    margin: theme.spacing(2),
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
      .then((response) => console.log(response));
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form autoComplete="off" className={classes.formContainer}>
        <Typography variant="h3" component="h3" gutterBottom>
          Cadastrar Instituição
        </Typography>

        <TextField
          id="name"
          label="Nome"
          required
          onChange={(event) => {
            setInstitution({ ...institution, name: event.target.value });
          }}
        />
        <TextField
          id="address"
          label="Endereço"
          required
          onChange={(event) => {
            setInstitution({ ...institution, address: event.target.value });
          }}
        />
        <TextField
          id="city"
          label="Cidade"
          required
          onChange={(event) => {
            setInstitution({ ...institution, city: event.target.value });
          }}
        />
        <TextField
          id="state"
          label="Estado"
          required
          onChange={(event) => {
            setInstitution({ ...institution, state: event.target.value });
          }}
        />
        <TextField
          id="credentials"
          label="Credenciamento"
          required
          onChange={(event) => {
            setInstitution({ ...institution, credentials: event.target.value });
          }}
        />
        <TextField
          id="mantainer"
          label="Mantenedora"
          required
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
          label="Visível"
        />
        <Button
          className={classes.registerButton}
          color="primary"
          variant="contained"
          onClick={registerInstitution}
        >
          Cadastrar Instituição
        </Button>
      </form>
    </div>
  );
};

export default RegisterInstitutionPage;
