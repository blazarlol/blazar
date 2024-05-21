import Elysia from "elysia";

// Routes
import { emailVerification } from "./email-verification";
import { passwordReset } from "./password-reset";

export const emailRoutes = new Elysia({ prefix: "/email" })
  .use(emailVerification)
  .use(passwordReset);
