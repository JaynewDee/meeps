const { loginUser, createUser, storeUserMsg } = require("./controllers");

const api = require("express").Router();

api.post("/user", loginUser);

api.post("/user/new", createUser);

api.post("/user/msg", storeUserMsg);

module.exports = { api };
