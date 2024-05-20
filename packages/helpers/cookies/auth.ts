import { setCookie } from "cookies-next";

export const createAuthSessionCookie = async (
  name: string,
  value: string,
  attributes: any
) => {
  await setCookie(name, value, attributes);
};
