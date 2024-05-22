import { setCookie, getCookie } from "cookies-next";

export const createAuthSessionCookie = (
  name: string,
  value: string,
  attributes: any
) => {
  setCookie(name, value, attributes);
};

export const getAuthSessionCookie = (name: string) => {
  return getCookie(name);
};
