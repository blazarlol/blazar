import Cookies from "js-cookie";

export const createSessionCookie = async (sessionCookie: any) => {
  Cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
