import decode from "jwt-decode";

export class AuthHandle {
  //
  static currentToken() {
    return sessionStorage.getItem("user_token");
  }
  //
  static isFreshToken(token: string) {
    try {
      const decoded: { exp: number } = decode(token);
      if (decoded.exp > Date.now() / 1000) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }

  //

  public static getUser(): {} {
    try {
      return decode(this.currentToken()!);
    } catch (err) {
      return "";
    }
  }

  //

  public static validate() {
    const token = this.getUser() as string | void;
    return !!token && !this.isFreshToken(token);
  }
  //
  public static login(token: string) {
    sessionStorage.setItem("user_token", token);
  }
  //
  public static logout() {
    sessionStorage.removeItem("user_token");
    window.location.assign("/");
  }
  //
}
