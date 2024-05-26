import { generateRandomString, alphabet } from "oslo/crypto";
import { CustomError } from "../errors";

export const generateId = async () => {
  const id = await generateRandomString(32, alphabet("a-z", "A-Z", "0-9"));

  return id;
};

export const generatePasswordHash = async (password: string) => {
  const hash = await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 2 ** 16,
    timeCost: 3,
  });

  if (!hash) {
    throw new CustomError("Failed to generate the password hash.", 500);
  }

  return hash;
};

export const generateEmailVerificationCode = async () => {
  const code = await generateRandomString(6, alphabet("0-9"));

  return code;
};

export const generateToken = async () => {
  const token = await generateRandomString(32, alphabet("a-z", "A-Z", "0-9"));

  return token;
};

export const generateTokenHash = async (token: string) => {
  const hasher = new Bun.CryptoHasher("sha256");

  const hash = await hasher.update(token).digest("hex");

  return hash;
};
