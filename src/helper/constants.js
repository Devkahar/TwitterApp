const ROUTES_CONSTANTS = {
  LOGIN_PAGE: "login",
  SIGNUP_PAGE: "signup",
  HOME_PAGE: "home",
  USER_PAGE: "user",
};

const BASE_URL = "http://localhost:4000";
const userProfilePath = function (_id) {
  return `/${_id}/tweet`;
};
const user_img = "/uploads/1678780323826-17317730.jpg";
module.exports = {
  ROUTES_CONSTANTS,
  BASE_URL,
  user_img,
  userProfilePath,
};
