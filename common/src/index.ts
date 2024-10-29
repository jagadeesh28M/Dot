import z from "zod";

export const signupInput = z.object({
  username: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
});

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const postTodo = z.object({
  title: z.string(),
});

export type SignUpInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type PostTodo = z.infer<typeof postTodo>;
