import { z } from "zod";

export const EmailSchema = z.string().email("Invalid email");

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/(?=.*\d)/, "Password must contain at least one number");

export const PasswordSchemaWithMaxLength = PasswordSchema.max(
  128,
  "Password can't be longer than 128 characters"
);

export const EmailVerificationCodeSchema = z
  // .number({ coerce: true })
  // .min(100000, "Invalid code")
  // .max(999999, "Invalid code");
  .string();
