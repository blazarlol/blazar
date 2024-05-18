import { Elysia, t } from "elysia";
import { authRoutes } from "./routes/auth";
import { emailRoutes } from "./routes/email";
import { treaty } from "@elysiajs/eden";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .group("/api", (app) => {
    return app.use(authRoutes).use(emailRoutes);
  })
  .listen(8080);

export const api = treaty<typeof app>("localhost:8080");
