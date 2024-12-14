import { postTodo } from "@jagadeesh28/dot";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const todoRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

// JWT Authorization check(middleware)
todoRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "") || "";
  try {
    const jwt = await verify(token, c.env.JWT_SECRET_KEY);
    if (jwt) {
      c.set("userId", jwt.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "user does not exist",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

// POST TODO

todoRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const todo = await c.req.json();
  const { success } = postTodo.safeParse(todo);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs",
    });
  }
  try {
    const userId = c.get("userId");
    const addTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        userId: Number(userId),
      },
    });
    if (!addTodo) {
      c.status(403);
      return c.json({
        msg: "todo is not created",
      });
    }
    return c.json({
      msg: "todo is created successfully",
    });
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "Error occured during the todo creation",
    });
  }
});

// GET TODO'S

todoRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");

    const todos = await prisma.todo.findMany({
      where: {
        userId: Number(userId),
      },
    });

    if (!todos) {
      c.status(404);
      return c.json({
        msg: "no todos",
      });
    }

    return c.json({
      todos: todos,
    });
  } catch (err) {
    c.status(403);
    return c.json({
      msg: "error unknown",
    });
  }
});

// UPDATE TODO STATUS

todoRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const todoId = c.req.param("id");

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(todoId),
      },
    });

    const completedTodo = await prisma.todo.update({
      where: {
        id: Number(todoId),
      },
      data: {
        isCompleted: !todo?.isCompleted,
      },
    });
    if (!completedTodo) {
      c.status(403);
      return c.json({
        msg: "unable to update todos",
      });
    }
    return c.json({
      msg: "todo is completed and updated",
    });
  } catch (err) {
    return c.json({
      msg: "error unknown",
    });
  }
});

// DELETE A SPECIFIC TASK

todoRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const todoId = c.req.param("id");

  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: Number(todoId),
      },
    });
    if (!deleteTodo) {
      c.status(403);
      return c.json({
        msg: "unable to delete todos",
      });
    }
    return c.json({
      msg: "todo is deleted",
    });
  } catch (err) {
    return c.json({
      msg: "error unknown",
    });
  }
});

// DELETE ALL TASK'S

todoRouter.delete("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  try {
    const deleteTodos = await prisma.todo.deleteMany({
      where: {
        userId: Number(userId),
      },
    });
    if (!deleteTodos) {
      c.status(403);
      return c.json({
        msg: "unable to delete todos",
      });
    }
    return c.json({
      msg: `all ${"todo's"} are deleted`,
    });
  } catch (err) {
    return c.json({
      msg: "error unknown",
    });
  }
});
