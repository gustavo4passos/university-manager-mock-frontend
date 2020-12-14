import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {},
  table: {
    minWidth: 700,
  },
  title: {
    flex: "1 1 100%",
  },
  titleContainer: {},
  addNewContainer: {
    backgroundColor: "blue",
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: "2%",
  },
});

const GenericTable = (props) => {
  const classes = useStyles();

  const [users, setUsers] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Toolbar className={classes.titleContainer}>
        <Typography
          className={classes.title}
          id="table-title"
          variant="h6"
          component="div"
        >
          {props.title}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.addButton}
          onClick={props.onAdd ? props.onAdd : () => {}}
        >
          Adicionar
        </Button>
      </Toolbar>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.titles.map((title) => (
              <StyledTableCell key={title}>{title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <StyledTableRow
              hover
              key={`${index}`}
              onClick={() => {
                console.log("Got here");
              }}
            >
              {props.columns.map((column) => (
                <StyledTableCell component="th" scope="row" key={column}>
                  {row[column]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
