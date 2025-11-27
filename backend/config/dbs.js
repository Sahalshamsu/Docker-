const mongoose = require("mongoose");

const connectDBS = async () => {
  mongoose
    .connect("mongodb://localhost:27017/SchoolData")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
};

module.exports = connectDBS;