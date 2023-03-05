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

type PostBody = LoginEntity | RegisterEntity;

export const API = {
  baseUrl: "http://localhost:3001/api",
  postOptions: (body: PostBody) => ({
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }),
  login: async function (userEntity: LoginEntity) {
    return await fetch(`${this.baseUrl}/user`, this.postOptions(userEntity));
  },
  register: async function (userEntity: RegisterEntity) {
    return await fetch(
      `${this.baseUrl}/user/new`,
      this.postOptions(userEntity)
    );
  }
};
