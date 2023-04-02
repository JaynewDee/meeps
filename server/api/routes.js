const {
  loginUser,
  createUser,
  storeUserMsg,
  getMe,
  getAllRooms,
  getRecentMessages
} = require("./controllers");

const jwtAuth = require("../auth");

const api = require("express").Router();

/* 
  GET
*/
api.get("/rooms", getAllRooms);
api.get("/rooms/central", getRecentMessages);
api.get("/user/me", jwtAuth.middleware, getMe);

/* 
  POST
*/
api.post("/user", loginUser);
api.post("/user/new", createUser);
api.post("/user/msg", jwtAuth.middleware, storeUserMsg);

module.exports = { api };
