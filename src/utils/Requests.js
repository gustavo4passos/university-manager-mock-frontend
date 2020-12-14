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

export const getCourses = (setCourses) => {
  authorizedGet(
    `http://localhost:5000/curs/all`,
    (response) => {
      console.log(response);
      setCourses(response.data);
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
