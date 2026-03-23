import { loginSchema } from "@/features/auth/lib/schemas/loginSchema.ts"
import z from "zod/v4"

export type LoginInputs = z.infer<typeof loginSchema>
