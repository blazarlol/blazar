import { Elysia, t } from "elysia";
import { userRoutes } from "./routes/users";

const app = new Elysia();

app.group("/api", (app) => app.use(userRoutes)).listen(8080);
