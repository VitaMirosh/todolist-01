import {FilterValueTitle, Todolist} from '../app/App.tsx';
import {v1} from 'uuid';


const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case 'delete_todolist': {
      const {id} = action.payload
      return state.filter(todolist => todolist.id !== id)
    }
    case 'create_todolist': {
      const {id, title} = action.payload
      const newTodolist: Todolist = {id, title, filter: 'all'}
      return [...state, newTodolist]
    }
    case 'change_title_todolist': {
      const {id, title} = action.payload
      return state.map(t => t.id === id ? {...t, title} : t)
    }
    case 'change_filter_todolist': {
      const {id, filter} = action.payload
      return state.map(t => t.id === id ? {...t, filter} : t)
    }
    default:
      return state
  }
}
export const deleteTodolistAC = (id: string) => {
  return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
  const id = v1()
  return {type: 'create_todolist', payload: {id, title}} as const
}

export const changeTodolistTitleAC = (payload: { id: string, title: string }) => {
  return {type: 'change_title_todolist', payload} as const
}

export const changeTodolistFilterAC = (payload: { id: string, filter: FilterValueTitle }) => {
  return {type: 'change_filter_todolist', payload} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitle | ChangeTodolistFilter