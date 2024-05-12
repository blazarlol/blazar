import { generateRandomString, alphabet } from "oslo/crypto";

export const generateUserId = async () => {
  const id = await generateRandomString(32, alphabet("a-z", "A-Z", "0-9"));

  return id;
};

export const generatePasswordHash = async (password: string) => {
  const hash = await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 2 ** 16,
    timeCost: 3,
  });

  return hash;
};

export const generateEmailVerificationCode = async () => {
  const code = await generateRandomString(8, alphabet("0-9"));

  return code;
};

export const generateEmailVerificationToken = async () => {
  const token = await generateRandomString(32, alphabet("a-z", "A-Z", "0-9"));

  return token;
};
