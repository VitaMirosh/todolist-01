import { baseApi } from "@/app/baseApi"
import type { BaseResponse } from "@/common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { COUNT_SIZE } from "@/common/constants"

interface Patch {
  op: "replace" | "remove" | "add"
  path: (string | number)[]
  value?: any
}

type PatchCollection = {
  patches: Patch[]
  inversePatches: Patch[]
  undo: () => void
}

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { id: string; params: { page: number } }>({
      query: ({ id, params }) => {
        return { url: `todo-lists/${id}/tasks`, params: { ...params, count: COUNT_SIZE } }
      },

      providesTags: (_result, _error, { id }) => [{ type: "Task", id }],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),

      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      onQueryStarted: async ({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) => {
        const args = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: PatchCollection[] = []

        args.forEach((arg) => {
          return patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                "getTasks",
                { id: todolistId, params: { page: arg.params.page } },
                (res) => {
                  const index = res.items.findIndex((todo) => todo.id === taskId)
                  if (index !== -1) {
                    res.items[index] = { ...res.items[index], ...model }
                  }
                },
              ),
            ),
          )
        })

        try {
          await queryFulfilled
        } catch (error) {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
