const {
  loginUser,
  createUser,
  storeUserMsg,
  getMe,
  getUserRooms,
  getAllRooms,
  getRecentMessages,
  deleteAllMessages
} = require("./controllers");

const api = require("express").Router();

//

const jwtAuth = require("../auth");

//

api.get("/rooms", getAllRooms);
api.get("/rooms/user", getUserRooms);
api.get("/rooms/msgs", getRecentMessages);
api.get("/user/me", jwtAuth.middleware, getMe);

//

api.post("/user", loginUser);
api.post("/user/new", createUser);
api.post("/user/msg", jwtAuth.middleware, storeUserMsg);
api.delete("/user/msgs", jwtAuth.middleware, deleteAllMessages);

//

module.exports = { api };
