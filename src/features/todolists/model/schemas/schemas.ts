import { TaskPriority, TaskStatus } from "@/common/enums"
import z from "zod/v4"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number().int(),
  addedDate: z.iso.datetime({ local: true }),
})

export const UpdateTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
})
export const changeTitleSchema = z.object({
  title: z.string().min(1),
})