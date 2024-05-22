import { eq } from "drizzle-orm";
import { emailVerificationTable } from "../../lib/drizzle/schema/email-verification";
import { Database } from "../../types";
import { CustomError } from "@blazar/helpers";

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
    throw new CustomError("Error creating email verification", 409);
  }

  return result;
};

export const removeEmailVerification = async (db: Database, userId: string) => {
  const result = await db
    .delete(emailVerificationTable)
    .where(eq(emailVerificationTable.userId, userId));

  if (!result) {
    throw new CustomError("Email verification not found", 409);
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
    throw new CustomError("Email verification not found for this token", 409);
  }

  if (emailVerification.code !== code) {
    throw new CustomError("Invalid code", 409);
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
    throw new CustomError("Failed to hash the token");
  }

  const result = await db
    .select({
      expiresAt: emailVerificationTable.expiresAt,
    })
    .from(emailVerificationTable)
    .where(eq(emailVerificationTable.tokenHash, tokenHash));

  const emailVerification = result[0];

  if (!emailVerification) {
    throw new CustomError("Email verification not found for this token.", 409);
  }

  if (new Date(emailVerification.expiresAt).getTime() < new Date().getTime()) {
    throw new CustomError("Token expired", 401);
  }

  return { tokenHash };
};
