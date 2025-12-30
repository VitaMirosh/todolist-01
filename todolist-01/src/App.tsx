import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

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
export type FilterValueTitle = 'all' | 'active' | 'completed';

function App() {
  const [todolists, setTodolists] = useState<Todolist[]>([
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'}
  ]);
  const [tasks, setTasks] = useState<Task[]>(
    [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Redux', isDone: false}
    ]
  )


  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }


  const changeFilter = (todolistID: string, filter: FilterValueTitle) => {
    setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter}: t));
  }

  const createTask = (title: string) => {
    const newTask = {id: v1(), title: title, isDone: false}
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    const taskChecked = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
    setTasks(taskChecked)


  }

  return (
    <div>
      {todolists.map(todolist => {
          let filteredTasks = tasks
          if (todolist.filter === 'active') {
            filteredTasks = tasks.filter(task => !task.isDone)
          }
          if (todolist.filter === 'completed') {
            filteredTasks = tasks.filter(task => task.isDone)
          }
          return <TodolistItem key={todolist.id}
                               todolist={todolist}
                               tasks={filteredTasks}
                               deleteTask={deleteTask}
                               changeFilter={changeFilter}
                               createTask={createTask}
                               changeTaskStatus={changeTaskStatus}
          />
        }
      )}

    </div>

  )
}

export default App
