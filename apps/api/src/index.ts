import { Elysia, t } from "elysia";
import { userRoutes } from "./routes/users";
import { authRoutes } from "./routes/auth";
import { emailRoutes } from "./routes/email";
import { treaty } from "@elysiajs/eden";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Elysia()
  .group("/api", (app) => {
    return app.use(userRoutes).use(authRoutes).use(emailRoutes);
  })
  .listen(8080);

export const api = treaty<typeof app>("localhost:8080");
