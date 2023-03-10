const { loginUser, createUser, updateRoomHistory } = require("./controllers");
const api = require("express").Router();

api.post("/user", loginUser);

api.post("/user/new", createUser);

api.post("/user/history", updateRoomHistory);
module.exports = { api };
