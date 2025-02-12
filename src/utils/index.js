const logoutUser = () => {
  window.localStorage.removeItem("userToken");
  window.location.reload();
};

const logoutAdmin = () => {
  window.localStorage.removeItem("adminToken");
  window.location.reload();
};

export { logoutUser, logoutAdmin };
