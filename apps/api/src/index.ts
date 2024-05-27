import { Elysia, t } from "elysia";
import { authRoutes } from "./routes/auth";
import { emailRoutes } from "./routes/email";
import { treaty } from "@elysiajs/eden";
import cors from "@elysiajs/cors";
import { accountRoutes } from "./routes/account";

const app = new Elysia()
  .use(cors())
  .group("/api", (app) => {
    return app.use(authRoutes).use(emailRoutes).use(accountRoutes);
  })

  .listen(8080);

export type Api = typeof app;
export const { api } = treaty<typeof app>("localhost:8080");
