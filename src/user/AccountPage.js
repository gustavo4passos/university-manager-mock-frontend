import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../Auth";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import * as requests from "../utils/Requests";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  userName: {
    justifyContent: "center",
  },
});

const AccountPage = (props) => {
  const [institutions, setInstitutions] = React.useState(null);
  const auth = useAuth();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  console.log("alright babe", auth.user);

  React.useEffect(() => {
    requests.getInstitutions(setInstitutions);
  }, []);

  return (
    <Card className={classes.root}>
      {auth.user && (
        <>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Minha Conta
            </Typography>
            <AccountCircleIcon />
            <Typography
              variant="h5"
              component="h2"
              className={classes.userName}
            >
              {`${auth.user.nome} ${auth.user.sobrenome}`}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {`${auth.user.username}`}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {`${auth.user.cargo}`}
            </Typography>
            <Typography variant="body2" component="p">
              {institutions && institutions[auth.user.inst_id] && (
                <Link
                  href="#"
                  onClick={() =>
                    props.history.push(`/institution/${auth.user.inst_id}`)
                  }
                >
                  {institutions[auth.user.inst_id].nome}
                </Link>
              )}
            </Typography>
          </CardContent>
          <CardActions
            onClick={() => props.history.push(`/update-user/${auth.user.id}`)}
          >
            <Button size="small">Editar</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default withRouter(AccountPage);
