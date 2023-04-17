export type RegisterEntity = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginEntity = {
  email: string;
  password: string;
};

export type MsgEntity = {
  text: string;
  author: string;
};

export type PostBody = LoginEntity | RegisterEntity | MsgEntity;

export type RequestObject = {
  method: string;
  headers: { [key: string]: string };
  body: string;
};

export interface APIModule {
  baseUrl: string;
  login: (entity: LoginEntity) => Promise<any>;
  register: (entity: RegisterEntity) => Promise<any>;
  persistMsg: (entity: MsgEntity, roomId: string) => Promise<any>;
  getUserRooms: (userId: string) => Promise<any>;
  getRooms: () => Promise<any>;
  getMe: () => Promise<any>;
  getRecentMessages: (roomName: string) => any;
  deleteAllMessages: () => any;
}
