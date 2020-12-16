import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GenericTable from "../utils/GenericTable";
import { withRouter } from "react-router-dom";
import { useAuth } from "../Auth";
import * as requests from "../utils/Requests";
import * as permissions from "../utils/Permissions";

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

  const auth = useAuth();
  const handleUpdate = (inst) => {
    if (auth.user && permissions.canUpdateInstitution(auth.user)) {
      props.history.push(`/update-institution/${inst.id}`);
    } else if (auth.user && permissions.canUpdateOwnInstitution(auth.user)) {
      if (auth.user.inst_id === inst.id) {
        props.history.push(`/update-institution/${inst.id}`);
      }
    }
  };

  const allowUpdate = (inst) => {
    if (auth.user && permissions.canUpdateInstitution(auth.user)) return true;
    if (
      auth.user &&
      permissions.canUpdateOwnInstitution(auth.user) &&
      auth.user.inst_id === inst.id
    )
      return true;

    return false;
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GenericTable
        title="Instituições"
        titles={["Nome", "Endereço", "Cidade", "Estado", "Mantenedora"]}
        columns={["nome", "endereco", "cidade", "estado", "mantenedora"]}
        rows={Object.values(institutions)}
        showAdd={permissions.canCreateInstitution(auth.user)}
        onAdd={() => props.history.push("/register-institution")}
        handleEdit={handleUpdate}
        rowDisableEdit={(inst) => !allowUpdate(inst)}
        onRowClick={{ nome: (inst) => `/institution/${inst.id}` }}
      />
    </div>
  );
};

export default withRouter(InstitutionsPage);
