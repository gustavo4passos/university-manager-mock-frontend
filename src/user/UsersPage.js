import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import GenericTable from "../utils/GenericTable";
import { withRouter } from "react-router-dom";
import * as requests from "../utils/Requests";

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
  const classes = useStyles();
  const [users, setUsers] = React.useState({});

  React.useEffect(() => {
    requests.getUsers(setUsers);
  }, []);

  return (
    <div className={classes.container}>
      <GenericTable
        title="Usuários"
        titles={["Nome", "Sobrenome", "Cargo", "Telefone", "Username"]}
        columns={["nome", "sobrenome", "cargo", "telefone", "username"]}
        rows={Object.values(users)}
        onAdd={() => props.history.push("/create-user")}
      />
    </div>
  );
};

export default withRouter(UserPage);
