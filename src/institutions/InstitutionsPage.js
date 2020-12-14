import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GenericTable from "../utils/GenericTable";
import { withRouter } from "react-router-dom";
import * as requests from "../utils/Requests";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
}));

const InstitutionsPage = (props) => {
  const [institutions, setInstitutions] = React.useState({});

  React.useEffect(() => {
    requests.getInstitutions(setInstitutions);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GenericTable
        title="Instituições"
        titles={["Nome", "Endereço", "Cidade", "Estado", "Mantenedora"]}
        columns={["nome", "endereco", "cidade", "estado", "mantenedora"]}
        rows={Object.values(institutions)}
        onAdd={() => props.history.push("/register-institution")}
        handleClick={(inst) => {
          props.history.push(`/update-institution/${inst.id}`);
        }}
      />
    </div>
  );
};

export default withRouter(InstitutionsPage);
