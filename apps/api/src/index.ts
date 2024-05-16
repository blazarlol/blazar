import { Elysia, t } from "elysia";
import { userRoutes } from "./routes/users";
import { authRoutes } from "./routes/auth";
import { emailRoutes } from "./routes/email";
import { treaty } from "@elysiajs/eden";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .group("/api", (app) => {
    return app.use(userRoutes).use(authRoutes).use(emailRoutes);
  })
  .listen(8080);

export const api = treaty<typeof app>("localhost:8080");
