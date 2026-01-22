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

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction

