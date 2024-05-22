import Elysia from "elysia";

// Routes
import { signUp } from "./signup";
import { signIn } from "./signin";
import { signOut } from "./signout";
import { emailVerification } from "./email-verification";
import { passwordReset } from "./password-reset";
import { validateSession } from "./validate-session";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(signUp)
  .use(signIn)
  .use(signOut)
  .use(emailVerification)
  .use(passwordReset)
  .use(validateSession);
