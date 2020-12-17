import React from "react";
import GenericTable from "../utils/GenericTable";
import { withRouter } from "react-router-dom";
import { useAuth } from "../Auth";
import * as permissions from "../utils/Permissions";
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

  const auth = useAuth();
  return (
    <div>
      {mappedCourses && (
        <GenericTable
          title="Cursos"
          titles={["Nome", "Instituição", "Código"]}
          columns={["nome", "institutionName", "codigo_emec"]}
          rows={Object.values(mappedCourses)}
          onAdd={() => props.history.push("/create-course")}
          handleEdit={(course) =>
            props.history.push(`/update-course/${course.id}`)
          }
          rowDisableEdit={(course) =>
            !permissions.canUpdateCourse(auth.user, course)
          }
          rowDisableDelete={(course) =>
            !permissions.canRemoveCourse(auth.user, course)
          }
          handleRemove={(course) => requests.deleteCourse(course.id)}
        />
      )}
    </div>
  );
};

export default withRouter(CoursesPage);
