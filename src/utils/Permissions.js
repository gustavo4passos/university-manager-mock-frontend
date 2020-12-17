export const canQueryInstitutions = (user) => {
  const cargos = [
    "superintendente",
    "diretor",
    "dirigente institucional",
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

export const canRemoveUser = (user, userTarget) => {
  if (user === null || userTarget === null) return false;

  if (user.id === userTarget.id) return false;
  if (user.cargo === "superintendente" || user.cargo === "debug") return true;
  if (user.cargo === "diretor") {
    const allowed = ["dirigente institucional", "diretor", "funcionário"];
    return allowed.includes(userTarget.cargo);
  }
  return false;
};

export const canEditUser = (user, userTarget) => {
  if (user === null || userTarget === null) return false;

  if (user.cargo === "superintendente" || user.cargo === "debug") return true;
  if (user.cargo === "diretor") {
    const allowed = ["dirigente institucional", "diretor", "funcionário"];
    return allowed.includes(userTarget.cargo);
  }
  return false;
};

export const canCreateInstitution = (user) => {
  const cargos = ["superintendente", "dirigente institucional", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canUpdateOwnInstitution = (user) => {
  const cargos = ["superintendente", "diretor", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canViewNotVisibleInstitutions = (user) => {
  const cargos = ["superintendente", "debug"];
  return user && cargos.includes(user.cargo);
};

export const canAddCourseToInstitution = (user, institution) => {
  const cargos = ["superintendente", "diretor", "funcionario"];

  if (user && cargos.includes(user.cargo)) {
    if (user.inst_id === institution.id) return true;
  }

  return false;
};

export const canUpdateCourse = (user, course) => {
  const cargos = [
    "superintendente",
    "diretor",
    "dirigente institucional",
    "funcionario",
  ];
  if (
    user &&
    course &&
    (user.inst_id === course.inst_id || cargos.includes(user.cargo))
  )
    return true;
  return false;
};

export const canRemoveCourse = (user, course) => {
  const cargos = [
    "superintendente",
    "diretor",
    "dirigente institucional",
    "funcionario",
  ];
  if (
    user &&
    course &&
    user.inst_id === course.inst_id &&
    cargos.includes(user.cargo)
  )
    return true;
  return false;
};
