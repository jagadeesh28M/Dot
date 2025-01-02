import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const settingsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

settingsRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const jwt = c.req.header("token");
  if (!jwt) {
    c.status(404);
    return c.json({
      message: "Login First",
    });
  }

  try {
    const token = await verify(jwt, c.env.JWT_SECRET_KEY);
    const doesUserExist = await prisma.user.findFirst({
      where: {
        id: token.id,
      },
    });
    console.log(doesUserExist);
    return c.json({
      username: doesUserExist?.username,
      email: doesUserExist?.email,
    });
  } catch (error) {
    console.error("Token verification failed", error);
    return c.json({ message: "Invalid or expired token" }, 401);
  }
});

settingsRouter.put("/username/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const jwt = c.req.header("token");
  const { username } = await c.req.json();
  if (!jwt) {
    c.status(404);
    return c.json({
      message: "Login First",
    });
  }

  try {
    const token = await verify(jwt, c.env.JWT_SECRET_KEY);
    const updateUsername = await prisma.user.update({
      where: {
        id: token.id,
      },
      data: {
        username: username,
      },
    });
    return c.json({
      msg: "Username changed successfully",
      username: updateUsername?.username,
    });
  } catch (error) {
    if (error.code === "P2002") {
      // This is the unique constraint error for 'username'
      return c.json({ message: "Username is already taken" }, 400);
    }
    console.error("Token verification failed", error);
    return c.json({ message: "Invalid or expired token" }, 401);
  }
});
