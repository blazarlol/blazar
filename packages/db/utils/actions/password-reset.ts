import { eq } from "drizzle-orm";
import { passwordResetTable } from "../../lib/drizzle/schema/password-reset";
import { Database } from "../../types";
import { CustomError } from "@blazar/helpers";

export const createPasswordReset = async (
  db: Database,
  userId: string,
  tokenHash: string
) => {
  const id = crypto.randomUUID();

  const result = await db.insert(passwordResetTable).values({
    id,
    userId,
    tokenHash,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  if (!result) {
    throw new CustomError("Error creating password reset", 409);
  }

  return result;
};

export const validatePasswordResetToken = async (
  db: Database,
  token: string
) => {
  const hasher = new Bun.CryptoHasher("sha256");

  const tokenHash = await hasher.update(token).digest("hex");

  const result = await db
    .select({
      userId: passwordResetTable.userId,
    })
    .from(passwordResetTable)
    .where(eq(passwordResetTable.tokenHash, tokenHash));

  const passwordReset = result[0];

  if (!passwordReset) {
    throw new CustomError("Password reset not found", 409);
  }

  return passwordReset;
};

export const removePasswordReset = async (db: Database, userId: string) => {
  const result = await db
    .delete(passwordResetTable)
    .where(eq(passwordResetTable.userId, userId));

  if (!result) {
    throw new CustomError("Password reset not found", 409);
  }

  return result;
};
