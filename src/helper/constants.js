const ROUTES_CONSTANTS = {
  LOGIN_PAGE: "login",
  SIGNUP_PAGE: "signup",
  HOME_PAGE: "home",
  USER_PAGE: "user",
  PAGE_NOT_FOUND: "pageNotFound",
  EDIT_PAGE: "editProfile",
  EDIT_PASSWORD_PAGE: "editPasswordPage",
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
const getImgUrl = function (url) {
  console.log(url);
  if (!url) return BASE_URL + user_img;
  if (url[0] !== "/") return BASE_URL + "/" + url;
  return BASE_URL + url;
};
const getUserSuggestion = function (_id) {
  return `/user/${_id}/`;
};
module.exports = {
  ROUTES_CONSTANTS,
  BASE_URL,
  user_img,
  userProfilePath,
  getUserName,
  getImgUrl,
  getUserSuggestion,
};
