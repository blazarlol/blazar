import { CustomError } from "@blazar/helpers";
import { establishDatabasePoolConnection } from "./connection";
import { accountTable } from "../../lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { Database } from "../../types";

interface Account {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
}

export const createAccount = async (
  db: Database,
  { id, userId, userName, avatarUrl }: Account
) => {
  const result = await db.insert(accountTable).values({
    id,
    userId,
    username: userName,
    avatarUrl,
  });

  if (!result) {
    throw new CustomError("Failed to create the account", 409);
  }

  return result;
};

export const getAccount = async (db: Database, userId: string) => {
  const result = await db
    .select({
      userName: accountTable.username,
    })
    .from(accountTable)
    .where(eq(accountTable.userId, userId));

  if (!result) {
    throw new CustomError("Failed to get the account", 409);
  }

  const account = result[0];

  return account;
};

export const checkIfAccountExists = async (db: Database, userId: string) => {
  const result = await db
    .select()
    .from(accountTable)
    .where(eq(accountTable.userId, userId));

  if (!result) {
    return false;
  }

  return true;
};
