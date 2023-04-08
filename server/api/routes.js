const {
  loginUser,
  createUser,
  storeUserMsg,
  getMe,
  getAllRooms,
  getRecentMessages,
  deleteAllMessages
} = require("./controllers");

const jwtAuth = require("../auth");

const api = require("express").Router();

//

api.get("/rooms", getAllRooms);
api.get("/rooms/central", getRecentMessages);
api.get("/user/me", jwtAuth.middleware, getMe);

//

api.post("/user", loginUser);
api.post("/user/new", createUser);
api.post("/user/msg", jwtAuth.middleware, storeUserMsg);
api.delete("/user/msgs", jwtAuth.middleware, deleteAllMessages);
//

module.exports = { api };
