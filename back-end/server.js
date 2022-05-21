const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 5000;

const DB = process.env.DATABASE_URI.replace(
  /<password>/,
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => console.log("Error connecting to database! \n " + err));

app.listen(port, "localhost", () => {
  console.log("server is listening on at http://localhost:%d", port);
});
