import { eq } from "drizzle-orm";
import { userTable } from "../../lib/drizzle/schema/user";
import { Database } from "../../types";

export const getUsers = async (db: Database) => {
  const result = await db.select().from(userTable);

  return result;
};

export const getUserById = async (db: Database, userId: string) => {
  const result = await db
    .select({
      email: userTable.email,
      emailVerified: userTable.emailVerified,
    })
    .from(userTable)
    .where(eq(userTable.id, userId));

  const user = result[0];

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.emailVerified) {
    throw new Error("Email not verified");
  }

  return user;
};

export const getUserByEmail = async (db: Database, email: string) => {
  const result = await db
    .select({
      id: userTable.id,
      emailVerified: userTable.emailVerified,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  const user = result[0];

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.emailVerified) {
    throw new Error("Email not verified");
  }

  return user;
};

export const createUser = async (
  db: Database,
  {
    id,
    email,
    passwordHash,
  }: { id: string; email: string; passwordHash: string }
) => {
  const check = await db
    .select({
      email: userTable.email,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  if (check.length > 0) {
    throw new Error("User already exists");
  }

  const result = await db.insert(userTable).values({ id, email, passwordHash });

  if (!result) {
    throw new Error("Failed to create user");
  }

  return result;
};

export const validateUser = async (
  db: Database,
  { email, password }: { email: string; password: string }
) => {
  const result = await db
    .select({
      id: userTable.id,
      email: userTable.email,
      passwordHash: userTable.passwordHash,
      emailVerified: userTable.emailVerified,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  const user = result[0];

  if (!user) {
    throw new Error("User not found");
  }

  const passwordValid = await Bun.password.verify(password, user.passwordHash);

  if (!passwordValid) {
    throw new Error("Invalid password");
  }

  if ((await passwordValid) && !user.emailVerified) {
    throw new Error("Email not verified");
  }

  return user;
};

export const verifyUserEmail = async (db: Database, userId: string) => {
  return db
    .update(userTable)
    .set({ emailVerified: true })
    .where(eq(userTable.id, userId));
};

export const changeUserPasswordHash = async (
  db: Database,
  userId: string,
  passwordHash: string
) => {
  await db
    .update(userTable)
    .set({ passwordHash })
    .where(eq(userTable.id, userId));
};
