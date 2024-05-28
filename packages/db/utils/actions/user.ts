import { eq } from "drizzle-orm";
import { userTable } from "../../lib/drizzle/schema/user";
import { Database } from "../../types";
import { CustomError } from "@blazar/helpers";

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
    throw new CustomError("User not found", 409);
  }

  if (!user.emailVerified) {
    throw new CustomError("Email not verified", 409);
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
    throw new CustomError("User not found", 409);
  }

  if (!user.emailVerified) {
    throw new CustomError("Email not verified", 409);
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
    throw new CustomError("User already exists", 409);
  }

  const result = await db.insert(userTable).values({ id, email, passwordHash });

  if (!result) {
    throw new CustomError("Failed to create user", 500);
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
    throw new CustomError("User not found", 409);
  }

  const passwordValid = await Bun.password.verify(password, user.passwordHash);

  if (!passwordValid) {
    throw new CustomError("Invalid password", 409);
  }

  if ((await passwordValid) && !user.emailVerified) {
    throw new CustomError("Email not verified", 409);
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

export const changeOnboardingStatus = async (
  db: Database,
  userId: string,
  value: boolean
) => {
  await db
    .update(userTable)
    .set({ onboardingComplete: value })
    .where(eq(userTable.id, userId));
};
