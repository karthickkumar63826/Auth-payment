const mongoose = require("mongoose");

const mongoDbConnection = (url) => {
  console.log("Connecting with database");
  mongoose.set("debug", true);
  return mongoose.connect(url);
};

module.exports = mongoDbConnection;
