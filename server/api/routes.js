const {
  loginUser,
  createUser,
  storeUserMsg,
  getAllRooms
} = require("./controllers");

const jwtAuth = require("../auth");

const api = require("express").Router();

api.post("/user", loginUser);

api.post("/user/new", createUser);

api.post("/user/msg", jwtAuth.middleware, storeUserMsg);

api.get("/rooms", getAllRooms);

module.exports = { api };
