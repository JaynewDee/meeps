const { loginUser, createUser } = require("./controllers");
const api = require("express").Router();

api.post("/user", loginUser);

api.post("/user/new", createUser);

module.exports = { api };
