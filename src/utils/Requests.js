import axios from "axios";

export const objectToFormData = (obj) => {
  const formData = new FormData();

  Object.keys(obj).map((key) => {
    formData.set(key, obj[key]);
  });

  return formData;
};

export const authorizedGet = async (
  url,
  response = () => {},
  error = () => {}
) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const id = user !== null ? user.id : "";

  axios
    .get(url, { headers: { authorization: id } })
    .then(response)
    .catch(error);
};

export const authorizedPut = async (
  url,
  data,
  response = () => {},
  error = () => {}
) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const id = user !== null ? user.id : "";

  axios
    .put(url, objectToFormData(data), {
      headers: { authorization: id, "Content-Type": "multipart/form-data" },
    })
    .then(response)
    .catch(error);
};

export const authorizedPost = async (
  url,
  data,
  response = () => {},
  error = () => {}
) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const id = user !== null ? user.id : "";

  axios
    .post(url, objectToFormData(data), {
      headers: { authorization: id, "Content-Type": "multipart/form-data" },
    })
    .then(response)
    .catch(error);
};

export const authorizedDelete = async (
  url,
  data,
  response = () => {},
  error = () => {}
) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const id = user !== null ? user.id : "";

  axios
    .delete(url, {
      headers: { authorization: id, "Content-Type": "multipart/form-data" },
      data: objectToFormData(data),
    })
    .then(response)
    .catch(error);
};

export const getCourses = (setCourses) => {
  authorizedGet(
    `http://localhost:5000/curs/all`,
    (response) => {
      setCourses(response.data);
    },
    (error) => console.error(error)
  );
};

export const getCourse = (id, setCourse) => {
  authorizedGet(
    `http://localhost:5000/curs/${id}`,
    (response) => {
      setCourse(response.data);
    },
    (error) => console.error(error)
  );
};

export const getUsers = (setUsers) => {
  authorizedGet(`http://localhost:5000/user/all`, (response) => {
    setUsers(response.data);
  });
};

export const getInstitutions = (setInstitutions) => {
  authorizedGet(
    `http://localhost:5000/inst/all`,
    (response) => {
      setInstitutions(response.data);
    },
    (error) => {
      console.log("Error", error);
    }
  );
};

export const getUser = (id, setUser) => {
  authorizedGet(
    `http://localhost:5000/user/${id}`,
    (response) => {
      setUser(response.data);
    },
    (error) => console.error(error)
  );
};

export const updateUser = (userId, user, handleResponse, handleError) => {
  authorizedPost(
    `http://localhost:5000/user/${userId}`,
    user,
    handleResponse,
    handleError
  );
};

export const getInstitution = (id, setInstitution) => {
  authorizedGet(
    `http://localhost:5000/inst/${id}`,
    (response) => {
      setInstitution(response.data);
    },
    (error) => console.error(error)
  );
};

export const updateInstitution = (
  id,
  institution,
  handleResponse,
  handleError
) => {
  authorizedPost(
    `http://localhost:5000/inst/${id}`,
    institution,
    handleResponse,
    handleError
  );
};

export const updateCourse = (id, course, handleResponse, handleError) => {
  authorizedPost(
    `http://localhost:5000/curs/${id}`,
    course,
    handleResponse,
    handleError
  );
};

export const deleteUser = (id, handleResponse, handleError) => {
  authorizedDelete(
    `http://localhost:5000/user/${id}`,
    {},
    (response) => handleResponse(response.data),
    handleError
  );
};

export const deleteCourse = (id, handleResponse, handleError) => {
  authorizedDelete(
    `http://localhost:5000/curs/${id}`,
    {},
    (response) => handleResponse(response.data),
    handleError
  );
};

export const getCoursesPerInstitution = (id, setCourses) => {
  authorizedGet(
    `http://localhost:5000/curs/all?inst_id=${id}`,
    (response) => {
      console.log("opa", response.data);
      setCourses(response.data);
    },
    (error) => console.error(error)
  );
};
