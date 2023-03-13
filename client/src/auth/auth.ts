import decode from "jwt-decode";

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
  //
  public static getUser(): string {
    try {
      return decode(this.currentToken()!);
    } catch (err) {
      return "";
    }
  }
  //
  public static validate(): boolean {
    const token = this.getUser() as string | void;
    return !!token && !this.isFreshToken(token);
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
