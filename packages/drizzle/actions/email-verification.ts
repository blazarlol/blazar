import { eq } from "drizzle-orm";
import { emailVerificationTable } from "../schema/email-verification";
import { Database } from "../types";

export const createEmailVerification = async (
  db: Database,
  userId: string,
  code: string,
  token: string,
  expiresAt: Date
) => {
  try {
    await removeEmailVerification(db, userId);
  } catch (error) {
    // Do nothing
  }

  const result = await db.insert(emailVerificationTable).values({
    userId,
    code,
    token,
    expiresAt,
  });

  if (!result) {
    throw new Error("Error creating email verification");
  }

  return result;
};

export const removeEmailVerification = async (db: Database, userId: string) => {
  const result = await db
    .delete(emailVerificationTable)
    .where(eq(emailVerificationTable.userId, userId));

  if (!result) {
    throw new Error("Email verification not found");
  }

  return result;
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
