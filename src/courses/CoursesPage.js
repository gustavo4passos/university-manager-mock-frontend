import React from "react";
import GenericTable from "../utils/GenericTable";
import { withRouter } from "react-router-dom";
import * as requests from "../utils/Requests";

const CoursesPage = (props) => {
  const [courses, setCourses] = React.useState();
  const [institutions, setInstitutions] = React.useState(null);
  const [mappedCourses, setMappedCourses] = React.useState(null);

  React.useEffect(() => {
    requests.getCourses(setCourses);
    requests.getInstitutions(setInstitutions);
  }, []);

  React.useEffect(() => {
    if (courses && institutions) {
      const tmpMappedCourses = {};
      for (let course in courses) {
        tmpMappedCourses[course] = {
          ...courses[course],
          institutionName: institutions[courses[course].inst_id].nome,
        };
      }
      setMappedCourses(tmpMappedCourses);
    }
  }, [courses, institutions]);

  return (
    <div>
      {mappedCourses && (
        <GenericTable
          title="Cursos"
          titles={["Nome", "Instituição"]}
          columns={["nome", "institutionName"]}
          rows={Object.values(mappedCourses)}
          onAdd={() => props.history.push("/create-course")}
        />
      )}
    </div>
  );
};

export default withRouter(CoursesPage);
