import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';


export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = {
  [key: string]: Task[]
}


export const deleteTaskAC = createAction<{ id: string, taskId: string }>('tasks/deleteTask')

export const createTaskAC = createAction<{ id: string, title: string }>('tasks/createTask')

export const changeTaskStatusAC = createAction<{
  id: string,
  taskID: string,
  isDone: boolean
}>('tasks/changeTaskStatusAC')

export const changeTaskTitleAC = createAction<{
  id: string,
  taskID: string,
  title: string
}>('tasks/changeTaskTitleAC')



const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(deleteTaskAC, (state, action) => {
        const tasks = state[action.payload.id]
        const index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(createTaskAC, (state, action) => {
        const newItem = {id: nanoid(), title: action.payload.title, isDone: false}
        const tasks = state[action.payload.id]
        tasks.unshift(newItem)
      })

      .addCase(changeTaskStatusAC, (state, action) => {
        const tasks = state[action.payload.id]
        const taskStatus = tasks.find(task => task.id === action.payload.taskID)
        if (taskStatus) {
          taskStatus.isDone = action.payload.isDone
        }
      })
      .addCase(changeTaskTitleAC, (state, action) => {
        const tasks = state[action.payload.id]
        const taskTitle = tasks.find(task => task.id === action.payload.taskID)
        if (taskTitle) {
          taskTitle.title = action.payload.title
        }
      })

  }
)






