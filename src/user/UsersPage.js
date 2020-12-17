import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import GenericTable from "../utils/GenericTable";
import { withRouter } from "react-router-dom";
import { useAuth } from "../Auth";
import _ from "lodash";
import * as requests from "../utils/Requests";
import * as permissions from "../utils/Permissions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  table: {
    minWidth: 700,
  },
});

const UserPage = (props) => {
  const auth = useAuth();
  const classes = useStyles();
  const [users, setUsers] = React.useState({});

  const [institutions, setInstitutions] = React.useState(null);
  const [mappedUsers, setMappedUsers] = React.useState(null);

  React.useEffect(() => {
    requests.getUsers(setUsers);
  }, []);

  return (
    <div className={classes.container}>
      <GenericTable
        title="Usuários"
        titles={["Nome", "Sobrenome", "Cargo", "Telefone", "Username", "CPF"]}
        columns={["nome", "sobrenome", "cargo", "telefone", "username", "cpf"]}
        rows={Object.values(users)}
        onAdd={() => props.history.push("/create-user")}
        handleClick={(user) => {
          props.history.push(`/update-user/${user.id}`);
        }}
        handleEdit={(user) => {
          props.history.push(`/update-user/${user.id}`);
        }}
        handleRemove={(user) => {
          requests.deleteUser(user.id, () => {
            setUsers(_.omit(users, user.id));
          });
        }}
        rowDisableRemoval={(user) =>
          !permissions.canRemoveUser(auth.user, user)
        }
        rowDisableEdit={(user) => !permissions.canEditUser(auth.user, user)}
      />
    </div>
  );
};

export default withRouter(UserPage);
