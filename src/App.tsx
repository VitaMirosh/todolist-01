import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type Todolist = {
  id: string
  title: string
  filter: FilterValueTitle
}
export type TasksState = {
  [key: string]: Task[]
}
export type FilterValueTitle = 'all' | 'active' | 'completed';

function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()


  const [todolists, setTodolists] = useState<Todolist[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
  ]);
  const [tasks, setTasks] = useState<TasksState>({
      [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
      ],
      [todolistId2]: [
        {id: v1(), title: 'Rest Api', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: true},
        {id: v1(), title: 'Next', isDone: false},
        {id: v1(), title: 'Unitest', isDone: false}
      ],
    }
  )


  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks
    ({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
  }


  const changeFilter = (todolistID: string, filter: FilterValueTitle) => {
    setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter} : t));
  }

  const createItem = (todolistId: string, title: string) => {
    const newItem = {id: v1(), title: title, isDone: false}
    const newItems = {...tasks, [todolistId]: [newItem, ...tasks[todolistId]]}
    setTasks(newItems)
  }

  const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
    const taskChecked = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
    }
    setTasks(taskChecked)
  }
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }
  const createTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
    setTodolists(prev => [...prev, newTodolist])
    setTasks(prev => ({...prev, [todolistId]: []}))
  }

  const changeTaskTitle = (todolistId: string, taskID: string, title: string) => {
    const newTaskTitle = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, title} : t)
    }
    setTasks(newTaskTitle)
  }

  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist}/>
      {todolists.map(todolist => {
          const todolistTasks = tasks[todolist.id]
          let filteredTasks = todolistTasks
          if (todolist.filter === 'active') {
            filteredTasks = todolistTasks.filter(task => !task.isDone)
          }
          if (todolist.filter === 'completed') {
            filteredTasks = todolistTasks.filter(task => task.isDone)
          }
          return <TodolistItem key={todolist.id}
                               todolist={todolist}
                               tasks={filteredTasks}
                               deleteTask={deleteTask}
                               changeFilter={changeFilter}
                               createItem={createItem}
                               changeTaskStatus={changeTaskStatus}
                               deleteTodolist={deleteTodolist}
                               changeTaskTitle={changeTaskTitle}
          />
        }
      )}

    </div>

  )
}

export default App
