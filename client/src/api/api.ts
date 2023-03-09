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

type RequestObject = {
  method: string;
  headers: { [key: string]: string };
  body: string;
};

interface APIModule {
  baseUrl: string;
  postOptions: (body: PostBody) => RequestObject;
  login: (entity: LoginEntity) => Promise<any>;
  register: (entity: RegisterEntity) => Promise<any>;
}

// ! Client dev server must be listening @ 5173
// !  in development for requests to land at server

const baseByEnv =
  window.location.port === "5173"
    ? `http://localhost:3001`
    : `//${window.location.host}`;

export const API: APIModule = {
  baseUrl: baseByEnv + "/api",
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
    return await fetch(
      `${this.baseUrl}/user/new`,
      this.postOptions(userEntity)
    ).catch((err) => console.error(err));
  }
};
