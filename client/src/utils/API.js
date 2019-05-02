import axios from "axios";

export default {
  newUser: function(user) {
    return axios.post("/auth/signup", user);
  },
  login: function(user) {
    return axios.post("/auth/login/", user);
  },
  logout: function(company) {
    return axios.post("/auth/logout/", company);
  },
  userInfo: function() {
    return axios.get("/auth/userinfo/")
  },
  saveUser: function(user) {
    return axios.post("/auth/user", user)
  },
  signedIn: function() {
    return axios.get("/auth/user/")
  }
  
};
