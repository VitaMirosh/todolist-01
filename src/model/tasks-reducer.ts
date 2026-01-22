import type {TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from './todolists-reducer.ts';

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
      return {...state, [action.payload.id]: state[action.payload.id].filter((task) => task.id !== action.payload.taskId)}
    }
    default:
      return state
  }


}

export const deleteTaskAC = (payload: { id: string, taskId: string }) => {
  return {
    type: 'delete_task',
    payload
  }
}

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction