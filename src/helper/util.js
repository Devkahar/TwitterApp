const getCreatedDate = function (createdDate, edited) {
  if (!createdDate) return "";
  const date = new Date(createdDate);
  const dateString = date.toString();
  let dateArray = dateString.split(" ").slice(0, 5);
  let hour = Number.parseInt(dateArray[4].split(":")[0]);
  let min = dateArray[4].split(":")[1];
  let hourStr = "";
  if (hour > 12) {
    hourStr = hour - 12 + ":" + min + " PM";
  } else {
    hourStr = hour + ":" + min + " AM";
  }
  let dayStr = date.toLocaleDateString();
  console.log(dayStr, hourStr);
  if (edited) return "Edited " + dayStr + " " + hourStr;
  return dayStr + " " + hourStr;
};

const getDottedString = function (str) {
  if (str.length >= 4) {
    return str.slice(0, 4) + "...";
  }
  return str;
};
module.exports = {
  getCreatedDate,
  getDottedString,
};
