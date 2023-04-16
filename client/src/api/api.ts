// @ts-ignore
import { SessionAuthHandle } from "../auth/auth";

type RegisterEntity = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginEntity = {
  email: string;
  password: string;
};

type MsgEntity = {
  text: string;
  author: string;
};

type PostBody = LoginEntity | RegisterEntity | MsgEntity;

type RequestObject = {
  method: string;
  headers: { [key: string]: string };
  body: string;
};

interface APIModule {
  baseUrl: string;
  token: string | null;
  postOptions: (body: PostBody) => RequestObject;
  login: (entity: LoginEntity) => Promise<any>;
  register: (entity: RegisterEntity) => Promise<any>;
  persistMsg: (entity: MsgEntity, roomId: string) => Promise<any>;
  getUserRooms: (userId: string) => Promise<any>;
  getRooms: () => Promise<any>;
  getMe: () => Promise<any>;
  getRecentMessages: (roomName: string) => any;
  deleteAllMessages: () => any;
}

// ! Client dev server must be listening @ 5173
// !  in development for requests to land at server

const currentPort = window.location.port;
const baseByEnv =
  currentPort === "5173" || currentPort === "5174"
    ? `http://localhost:3001`
    : `//${window.location.host}`;

export const API: APIModule = {
  baseUrl: baseByEnv + "/api",
  token: SessionAuthHandle.getToken(),
  postOptions: (body: PostBody) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }),
  login: async function (userEntity: LoginEntity) {
    return await fetch(`${this.baseUrl}/user`, this.postOptions(userEntity))
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  register: async function (userEntity: RegisterEntity) {
    return await fetch(`${this.baseUrl}/user/new`, this.postOptions(userEntity))
      .then((res) => res.json())
      .catch((err) => console.error(err));
  },
  persistMsg: async function (msgEntity: MsgEntity, roomName: string) {
    return await fetch(`${this.baseUrl}/user/msg?roomName=${roomName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(msgEntity)
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  },
  getUserRooms: async function (userId: string) {
    return await fetch(`${this.baseUrl}/rooms/user?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  },
  getRooms: async function () {
    return await fetch(`${this.baseUrl}/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  },
  getMe: async function () {
    return await fetch(`${this.baseUrl}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  },
  getRecentMessages: async function (roomName: string) {
    const options = {
      url: `${this.baseUrl}/rooms/msgs?roomName=${roomName}`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    };

    return await fetch(options.url, options.options)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  },
  deleteAllMessages: async function () {
    const options = {
      url: `${this.baseUrl}/user/msgs`,
      options: {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    };
    return await fetch(options.url, options.options)
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
};
