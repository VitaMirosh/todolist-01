import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValueTitle = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Redux', isDone: false}
    ]
  )
 const [filter, setFilter] = useState<FilterValueTitle>('all');

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  let filteredTasks = tasks
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone)
  }
const changeFilter = (filter: FilterValueTitle) => {
    setFilter(filter);
}

 const createTask = (title:string) => {
   const newTask = {id: v1(), title: title, isDone: false}
   const newTasks = [newTask,...tasks]
   setTasks(newTasks)
 }

  const changeTaskStatus = (taskID:string, isDone:boolean) =>{
    const taskChecked = tasks.map(t=>t.id === taskID ? {...t, isDone: isDone}: t)
    setTasks(taskChecked)


  }
  return (
    <>
      <TodolistItem title="What to learn"
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={filter}


      />
    </>
  )
}

export default App
