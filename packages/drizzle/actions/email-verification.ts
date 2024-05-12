import { eq } from "drizzle-orm";
import { emailVerificationTable } from "../schema/email-verification";
import { Database } from "../types";
import { TimeSpan } from "lucia";

export const createEmailVerification = async (
  db: Database,
  id: string,
  code: string,
  token: string,
  expiresAt: Date
) => {
  return await db.insert(emailVerificationTable).values({
    userId: id,
    code,
    token,
    expiresAt,
  });
};

export const validateEmailVerificationCode = async (
  db: Database,
  token: string,
  code: string
) => {
  const result = await db
    .select({
      userId: emailVerificationTable.userId,
      code: emailVerificationTable.code,
    })
    .from(emailVerificationTable)
    .where(eq(emailVerificationTable.token, token));

  const emailVerification = result[0];

  if (!emailVerification) {
    throw new Error("Email verification not found for this token");
  }

  if (emailVerification.code !== code) {
    throw new Error("Invalid code");
  }

  return { userId: emailVerification.userId };
};
