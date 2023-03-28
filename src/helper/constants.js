const ROUTES_CONSTANTS = {
  LOGIN_PAGE: "login",
  SIGNUP_PAGE: "signup",
  HOME_PAGE: "home",
  USER_PAGE: "user",
  PAGE_NOT_FOUND: "pageNotFound",
  EDIT_PAGE: "editProfile",
  EDIT_PASSWORD_PAGE: "editPasswordPage",
};
// https://cyan-frightened-blackbuck.cyclic.app
// http://localhost:4000
// https://todosmaker.s3.ap-south-1.amazonaws.com
const BASE_URL = "http://localhost:4000";
const BASE_IMG = "http://localhost:4000/uploads";
const userProfilePath = function (_id) {
  return `/user/${_id}/`;
};
const user_img = "/1678946468506-blank-profile-picture-973460__340.webp";
const getUserName = function (name) {
  return "@" + name.split(" ").join("").toLowerCase();
};
const getImgUrl = function (url) {
  console.log("Get Image", url);
  if (!url || url === "") return BASE_IMG + user_img;
  const newUrl = url.split("/").pop();
  if (newUrl) return BASE_IMG + "/" + newUrl;
  return BASE_IMG + url;
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
