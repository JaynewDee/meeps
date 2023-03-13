const { loginUser, createUser, storeUserMsg } = require("./controllers");

const jwtAuth = require("../auth");

const api = require("express").Router();

api.post("/user", loginUser);

api.post("/user/new", createUser);

api.post("/user/msg", jwtAuth.middleware, storeUserMsg);

module.exports = { api };
