require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, "localhost", () => {
  console.log("server is listening on at http://localhost:%d", port);
});
