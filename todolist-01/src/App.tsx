import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useState} from 'react';

export type Task = {
  id: number
  title: string
  isDone: boolean
}
export type FilterValueTitle = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    [
      {id: 1, title: 'HTML&CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'ReactJS', isDone: false},
      {id: 4, title: 'Redux', isDone: false}
    ]
  )
 const [filter, setFilter] = useState<FilterValueTitle>('all');

  const deleteTask = (taskId: number) => {
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



  return (
    <>
      <TodolistItem title="What to learn"
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}


      />
    </>
  )
}

export default App
