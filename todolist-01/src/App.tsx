import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type Task = {
  id: number
  title: string
  isDone: boolean
}
  function App()
  {
  const tasks1:Task[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    { id: 4, title: 'Redux', isDone: false }
  ]

  const tasks2:Task[] = [


  ]

  return (
    <>
      <TodolistItem title="What to learn" tasks={tasks1}/>
      <TodolistItem title="Songs" tasks={tasks2}/>
    </>
  )
}

export default App
