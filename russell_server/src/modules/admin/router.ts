import * as admin from "./controller";

export const baseUrl = "/admin";

export default [
  {
    method: "POST",
    route: "/login",
    handlers: [admin.login]
  }
];
