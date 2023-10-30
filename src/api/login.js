import serverConnectAPI from "./config/server-connect-api";

const login = (username, password, devicetype) => {
  var formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('devicetype', devicetype);

  return serverConnectAPI.post("/login", formData);
};

export default {
  login,
};
