import z from "zod/v4"
import { domainTaskSchema, UpdateTaskSchema } from "@/features/todolists/model/schemas/schemas.ts"

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = z.infer<typeof UpdateTaskSchema>
