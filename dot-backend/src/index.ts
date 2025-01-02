import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { todoRouter } from "./routes/todo";
import { cors } from "hono/cors";
import { settingsRouter } from "./routes/settings";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/todo", todoRouter);
app.route("api/v1/settings", settingsRouter);

export default app;
