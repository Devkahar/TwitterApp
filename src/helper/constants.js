const ROUTES_CONSTANTS = {
  LOGIN_PAGE: "login",
  SIGNUP_PAGE: "signup",
  HOME_PAGE: "home",
  USER_PAGE: "user",
};

const BASE_URL = "http://localhost:4000";
const userProfilePath = function (_id) {
  return `/user/${_id}/`;
};
const user_img =
  "/uploads/1678946468506-blank-profile-picture-973460__340.webp";
const getUserName = function (name) {
  return "@" + name.split(" ").join("").toLowerCase();
};
module.exports = {
  ROUTES_CONSTANTS,
  BASE_URL,
  user_img,
  userProfilePath,
  getUserName,
};
