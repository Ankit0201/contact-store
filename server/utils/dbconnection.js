const mongoose = require("mongoose");

const connectDB = (uri) => {
  try {
    mongoose
      .connect(uri, { dbName: "contactstore" })
      .then(() => {
        console.log("DB connected");
      })
      .catch((error) => {
        console.log(error, "DB Error");
        throw Error(error);
      });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { connectDB };
