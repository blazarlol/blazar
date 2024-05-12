import { Session, User } from "lucia";
import { lucia } from ".";

export const createSession = async (userId: string, country: string) => {
  const session = await lucia.createSession(userId, { country });

  return session;
};

export const validateSession = async (
  sessionId: string,
  context?: Promise<{ user: User | null; session: Session | null }>
) => {
  const { session, user } = await lucia.validateSession(sessionId);

  // if (session && session.fresh) {
  //   const sessionCookie = lucia.createSessionCookie(session.id);

  //   context.cookie

  // }

  // if (!session) {
  //   const sessionCookie = lucia.createBlankSessionCookie();
  // }
};
