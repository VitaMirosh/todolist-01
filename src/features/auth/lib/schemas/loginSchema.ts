import z from "zod/v4"

export const loginSchema = z.object({
  email: z.email({ error: "невалидный эмэйл" }),
  password: z.string(),
  rememberMe: z.boolean(),
})
