import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { todoRouter } from "./routes/todo";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

app.route("/api/user", userRouter);
app.route("/api/todo", todoRouter);

export default app;
