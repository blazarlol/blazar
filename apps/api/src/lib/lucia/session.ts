import { Session, User } from "lucia";
import { lucia } from ".";

export const createSession = async (userId: string, country: string) => {
  const session = await lucia.createSession(userId, { country });

  return session;
};

export const validateSession = async (sessionId: string) => {
  const { session, user } = await lucia.validateSession(sessionId);

  // if (session && session.fresh) {
  //   const sessionCookie = lucia.createSessionCookie(session.id);

  //   context.cookie

  // }

  // if (!session) {
  //   const sessionCookie = lucia.createBlankSessionCookie();
  // }

  return { session, user };
};

export const invalidateSession = async (sessionId: string) => {
  const { session } = await validateSession(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  return await lucia.invalidateSession(sessionId);
};
