import React from "react";
import Paper from "@material-ui/core/Paper";
import GenericTable from "../utils/GenericTable";
import { useParams } from "react-router-dom";
import * as requests from "../utils/Requests";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import * as permissions from "../utils/Permissions";
import { useAuth } from "../Auth";

const useStyles = makeStyles({
  institutionInfoContainer: {
    padding: 20,
    marginBottom: 10,
  },
});

const InstitutionPage = (props) => {
  const params = useParams();

  const auth = useAuth();
  const [institution, setInstitution] = React.useState(null);
  const [institutionCourses, setInstitutionCourses] = React.useState(null);
  const [institutionUsers, setInstitutionUsers] = React.useState(null);

  React.useEffect(() => {
    // Institution id is needed
    if (!params.id) return;

    requests.getInstitution(params.id, setInstitution);
    requests.getCoursesPerInstitution(params.id, setInstitutionCourses);
  }, []);

  const classes = useStyles();

  return (
    <div>
      {institution !== null && (
        <Paper className={classes.institutionInfoContainer}>
          <Typography variant="h3" bold>
            {institution.nome}
          </Typography>
          <Typography variant="h6">
            {institution.cidade}, {institution.estado}
          </Typography>
          {institutionCourses && (
            <Typography variant="overline">
              {Object.keys(institutionCourses).length} cursos disponíveis
            </Typography>
          )}
        </Paper>
      )}
      {institutionCourses !== null && (
        <GenericTable
          title="Cursos Disponíveis"
          titles={["Nome", "Código"]}
          columns={["nome", "codigo_emec"]}
          rows={Object.values(institutionCourses)}
          showAdd={
            institution &&
            auth.user &&
            permissions.canAddCourseToInstitution(auth.user, institution)
          }
          onAdd={() => props.history.push("/create-course")}
        />
      )}
    </div>
  );
};

export default withRouter(InstitutionPage);
