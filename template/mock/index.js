const reps = require("./example/getRepsData");
const user = require("./example/getUserData");
module.exports = () => {
  return { users: user, reps }
};