import decode from "jwt-decode";

interface UserLocal {
  data: {
    _id: string;
    __v?: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    messages: string[];
    password: string;
    rooms: string[];
  };
  iat: number;
  exp: number;
}

const UserDefault = {
  data: {
    _id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    messages: [""],
    password: "",
    rooms: [""],
    __v: 0
  },
  iat: 0,
  exp: 0
};

export class AuthHandle {
  //
  static currentToken(): string | null {
    return sessionStorage.getItem("user_token");
  }
  //
  static isFreshToken(token: string): boolean {
    try {
      const decoded: { exp: number } = decode(token);
      if (decoded.exp > Date.now() / 1000) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  public static getUser(): UserLocal {
    try {
      return decode(this.currentToken()!);
    } catch (err) {
      return UserDefault;
    }
  }
  //
  public static getToken(): string | null {
    return sessionStorage.getItem("user_token");
  }
  //
  public static validate(): boolean {
    const token = this.currentToken() as string;
    const isValid = !!token && this.isFreshToken(token);
    return isValid;
  }
  //
  public static login(token: string): void {
    sessionStorage.setItem("user_token", token);
  }
  //
  public static logout(): void {
    sessionStorage.removeItem("user_token");
    window.location.assign("/");
  }
  //
}
