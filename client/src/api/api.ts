// @ts-ignore
import { SessionAuthHandle } from "../auth/auth";
import {
  APIModule,
  PostBody,
  LoginEntity,
  RegisterEntity,
  MsgEntity,
} from "./types";

// ! Client dev server must be listening @ 5173 || 5174
// !  in development for requests to land at server

const currentPort = window.location.port;
const baseByEnv =
  currentPort === "5173" || currentPort === "5174"
    ? `http://localhost:3001`
    : `//${window.location.host}`;

const HTTPOptions = {
  authGet: () => ({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SessionAuthHandle.getToken()}`,
    },
  }),
  post: (body: PostBody) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }),
  authPost: (body: PostBody) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SessionAuthHandle.getToken()}`,
    },
    body: JSON.stringify(body),
  }),
  authDelete: () => ({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SessionAuthHandle.getToken()}`,
    },
  }),
};

export const API: APIModule = {
  baseUrl: baseByEnv + "/api",
  getRooms: async function () {
    return await fetch(`${this.baseUrl}/rooms`)
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  getMe: async function () {
    return await fetch(`${this.baseUrl}/user/me`, HTTPOptions.authGet())
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  login: async function (userEntity: LoginEntity) {
    return await fetch(`${this.baseUrl}/user`, HTTPOptions.post(userEntity))
      .then(res => res.json())
      .catch(err => console.log(err));
  },
  register: async function (userEntity: RegisterEntity) {
    return await fetch(`${this.baseUrl}/user/new`, HTTPOptions.post(userEntity))
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  persistMsg: async function (msgEntity: MsgEntity, roomName: string) {
    return await fetch(
      `${this.baseUrl}/user/msg?roomName=${roomName}`,
      HTTPOptions.authPost(msgEntity)
    )
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  getUserRooms: async function (userId: string) {
    return await fetch(
      `${this.baseUrl}/rooms/user?userId=${userId}`,
      HTTPOptions.authGet()
    )
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  getRecentMessages: async function (roomName: string) {
    return await fetch(
      `${this.baseUrl}/rooms/msgs?roomName=${roomName}`,
      HTTPOptions.authGet()
    )
      .then(res => res.json())
      .catch(err => console.error(err));
  },
  deleteAllMessages: async function () {
    return await fetch(`${this.baseUrl}/user/msgs`, HTTPOptions.authDelete())
      .then(res => res.json())
      .catch(err => console.error(err));
  },
};
