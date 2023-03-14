// Function
// return validationObject;
// SignUpStrings-> methods name.

const SignUpStrings = ["checkName", "checkEmail", "checkPassword", "checkBio"];

const validationObject = {
  isValid: true,
  error: "No Error Found",
};
const errorMessages = {
  name: "UserName Must be of 3 letter",
  bio: "Add Something in BIO",
  email: "Enter Valid Email",
  password:
    "Password length should be min 8 and max 16 .\nIncludes[a-z][A-z][0-9]#@$",
};
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const checkName = function (name) {
  if (name.length < 3) {
    validationObject.isValid = false;
    validationObject.error = errorMessages.name;
  } else {
    validationObject.isValid = true;
    validationObject.error = "";
  }
  return validationObject;
};

const checkBio = function (bio) {
  if (bio.length === 0) {
    validationObject.isValid = false;
    validationObject.error = errorMessages.bio;
  } else {
    validationObject.isValid = true;
    validationObject.error = "";
  }
  return validationObject;
};

const checkEmail = function (email) {
  console.log(email);
  if (email.match(emailRegex)) {
    validationObject.isValid = true;
    validationObject.error = "";
  } else {
    validationObject.isValid = false;
    validationObject.error = errorMessages.email;
  }
  return validationObject;
};
const checkPassword = function (password) {
  if (
    password.length >= 8 &&
    password.length <= 16 &&
    password.match(passwordRegex)
  ) {
    validationObject.isValid = true;
    validationObject.error = "";
  } else {
    validationObject.isValid = false;
    validationObject.error = errorMessages.password;
  }
  return validationObject;
};

module.exports = {
  checkName,
  checkBio,
  checkEmail,
  checkPassword,
  SignUpStrings,
};
