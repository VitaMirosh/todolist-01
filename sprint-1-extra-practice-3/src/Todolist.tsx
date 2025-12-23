import { useRef} from 'react';
import {FilterValuesType} from './App';
import * as React from 'react';


type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  children: React.ReactNode
}

export const Todolist = (props: PropsType)=> {

  const taskRef = useRef<HTMLInputElement>(null)

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return <div>
    <h3>{props.title}</h3>
    <div><input ref={taskRef}/>

      <button onClick={()=>{
        if(taskRef.current){
          props.addTask(taskRef.current.value)
          taskRef.current.value=''
        }
      }} >+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => {

          const onClickHandler = () => props.removeTask(t.id)

          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>
    </div>

    <div>
      <div>{props.children}</div>
    </div>


  </div>
}

