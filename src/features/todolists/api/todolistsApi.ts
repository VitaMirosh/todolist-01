import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => {
          return { ...tl, filter: "all", entityStatus: "idle" }
        })
      },
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "post",
        url: "/todo-lists",
        body: { title },
      }),
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "put",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        method: "delete",
        url: `/todo-lists/${id}`,
      }),
    }),
  }),
})
export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
