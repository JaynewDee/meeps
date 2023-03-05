import axios from "axios";
import decode from "jwt-decode";

type UserTransferEntity = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class AuthHandle {
  public static getUser() {
    decode(this.currentToken()!);
  }
  //
  public static currentToken() {
    localStorage.getItem("user_token") || "";
  }
  //
  public static validate() {
    const token = this.getUser() as string | void;
    return !!token && !this.isFreshToken(token);
  }
  //
  public static isFreshToken(token: string) {
    try {
      const decoded: { exp: number } = decode(token);
      if (decoded.exp > Date.now() / 10000) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
  //
  public static login(token: string) {
    localStorage.setItem("user_token", token);
    window.location.assign("/");
  }
  //
  public static logout = () => {
    localStorage.removeItem("user_token");
    window.location.assign("/");
  };
  //
  public static register = (userEntity: UserTransferEntity) =>
    axios.post("/user/new", userEntity);
}