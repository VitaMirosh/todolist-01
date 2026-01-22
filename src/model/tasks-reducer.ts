import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from './todolists-reducer.ts';
import {v1} from 'uuid';

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case 'create_todolist': {
      return {...state, [action.payload.id]: []}
    }
    case 'delete_todolist': {
      const newState = {...state}
      delete newState[action.payload.id]
      return newState
    }
    case 'delete_task': {
      return {
        ...state,
        [action.payload.id]: state[action.payload.id].filter((task) => task.id !== action.payload.taskId)
      }
    }
    case 'create_task': {
      const newItem = {id: v1(), title: action.payload.title, isDone: false}
      const newItems = {...state, [action.payload.id]: [newItem, ...state[action.payload.id]]}
      return newItems
    }
    case 'change_task_status': {
      const taskChecked = {
        ...state,
        [action.payload.id]: state[action.payload.id].map(t => t.id === action.payload.taskID ? {
          ...t,
          isDone: action.payload.isDone
        } : t)
      }
      return taskChecked
    }
    case 'change_task_title': {
      const newTaskTitle = {
        ...state,
        [action.payload.id]: state[action.payload.id].map(t => t.id === action.payload.taskID ? {
          ...t,
          title: action.payload.title
        } : t)
      }
     return newTaskTitle
    }

    default:
      return state
  }
}


export const deleteTaskAC = (payload: { id: string, taskId: string }) => {
  return {
    type: 'delete_task',
    payload
  } as const
}
export const createTaskAC = (payload: { id: string, title: string }) => {
  return {
    type: 'create_task',
    payload
  } as const
}
export const changeTaskStatusAC = (payload: { id: string, taskID: string, isDone: boolean }) => {
  return {
    type: 'change_task_status',
    payload
  } as const
}
export const changeTaskTitleAC = (payload: { id: string, taskID: string, title: string }) => {
  return {
    type: 'change_task_title',
    payload
  } as const
}


type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type Actions =
  CreateTodolistAction
  | DeleteTodolistAction
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction
