import { eq } from "drizzle-orm";
import { passwordResetTable } from "../../lib/drizzle/schema/password-reset";
import { Database } from "../../types";

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
    throw new Error("Error creating password reset");
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
    throw new Error("Password reset not found");
  }

  return passwordReset;
};

export const removePasswordReset = async (db: Database, userId: string) => {
  const result = await db
    .delete(passwordResetTable)
    .where(eq(passwordResetTable.userId, userId));

  if (!result) {
    throw new Error("Password reset not found");
  }

  return result;
};
