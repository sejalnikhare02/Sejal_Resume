const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("DataBase is not Connected");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successfull ....! ");
});

module.exports = connection;
