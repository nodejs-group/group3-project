const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hello From The Server</h1>");
});

module.exports = app;
