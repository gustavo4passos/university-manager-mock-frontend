export const canQueryInstitutions = (user) => {
  const cargos = [
    "superintendente",
    "diretor",
    "dirigente",
    "funcionario",
    "funcionário",
    "debug",
  ];
  return user && cargos.includes(user.cargo);
};
export const canUpdateInstitution = (user) => {
  const cargos = ["superintendente", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canManageUsers = (user) => {
  const cargos = ["superintendente", "diretor", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canCreateInstitution = (user) => {
  const cargos = ["superintendente", "dirigente", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canUpdateOwnInstitution = (user) => {
  const cargos = ["superintendente", "diretor", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canAddCourseToInstitution = (user, institution) => {
  const cargos = ["superintendente", "diretor", "funcionario"];

  if (user && cargos.includes(user.cargo)) {
    if (user.inst_id === institution.id) return true;
  }

  return false;
};
