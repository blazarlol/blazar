import { eq } from "drizzle-orm";
import { emailVerificationTable } from "../schema/email-verification";
import { Database } from "../types";

export const createEmailVerification = async (
  db: Database,
  userId: string,
  code: string,
  tokenHash: string,
  expiresAt: Date
) => {
  try {
    await removeEmailVerification(db, userId);
  } catch (error) {
    // Do nothing
  }

  const id = crypto.randomUUID();

  const result = await db.insert(emailVerificationTable).values({
    id,
    userId,
    code,
    tokenHash,
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
    .where(eq(emailVerificationTable.tokenHash, token));

  const emailVerification = result[0];

  if (!emailVerification) {
    throw new Error("Email verification not found for this token");
  }

  if (emailVerification.code !== code) {
    throw new Error("Invalid code");
  }

  return { userId: emailVerification.userId };
};

// TODO: Look into it if it isn't better to pass UserId to this function from the cookie or something
// TODO: Create reusable validateToken function (as there will be more functions like this for many things)
export const validateEmailVerificationToken = async (
  db: Database,
  token: string
) => {
  // TODO: Create package for hashing and use package functions here
  const hasher = new Bun.CryptoHasher("sha256");

  const tokenHash = await hasher.update(token).digest("hex");

  if (!tokenHash) {
    throw new Error("Failed to hash the token");
  }

  const result = await db
    .select({
      expiresAt: emailVerificationTable.expiresAt,
    })
    .from(emailVerificationTable)
    .where(eq(emailVerificationTable.tokenHash, tokenHash));

  const emailVerification = result[0];

  if (!emailVerification) {
    throw new Error(
      `Email verification not found for this token. ${tokenHash} | ${token}`
    );
  }

  if (new Date(emailVerification.expiresAt).getTime() < new Date().getTime()) {
    throw new Error("Token expired");
  }

  return { tokenHash };
};
