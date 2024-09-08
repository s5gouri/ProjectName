const express = require("express");
const {
  signup,
  signin,
  confirmation,
  createcookie,
  updating,
} = require("../controllers/log_functions");
const rt1 = express.Router();

rt1.post("/sign-up", signup);
rt1.post("/sign-in", signin);
rt1.get("/confirm/:jwt", confirmation);
rt1.post("/cookie", createcookie);

module.exports = { rt1 };
