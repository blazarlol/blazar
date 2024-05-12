import Elysia from "elysia";
import { getUsers } from "@blazar/drizzle";
import { establishDatabaseHTTPConnection } from "../../lib/drizzle";
import { createSession } from "../../lib/lucia/session";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const { db } = await establishDatabaseHTTPConnection();

    const result = await getUsers(db);

    return { result };
  })
  .post("/session", async () => {
    const session = createSession("test", "us");

    return { session };
  });
