import { userTable } from "../schema/user";
import { Database } from "../types";

export const getUsers = async (db: Database) => {
  const result = await db.select().from(userTable);

  return result;
};
