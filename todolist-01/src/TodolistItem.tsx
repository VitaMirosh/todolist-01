import {FilterValueTitle, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';


type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValueTitle) => void
  createTask: (title: string) => void;

}


export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {
  const [taskTitle, setTaskTitle] = useState('');

  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
  }
  const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)

  }
  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()

    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <input value={taskTitle}
             onChange={changeTaskHandler}
             onKeyDown={createTaskOnEnterHandler}/>
      <Button title={'+'} onClick={createTaskHandler}/>
      {tasks.length === 0 ? (<p>"Тасок нет"</p>) :
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }
            return (
              <li key={task.id}>
                <Button title={'x'} onClick={deleteTaskHandler}/>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>}


      <Button title={'All'} onClick={() => changeFilter('all')}/>
      <Button title={'Active'} onClick={() => changeFilter('active')}/>
      <Button title={'Completed'} onClick={() => changeFilter('completed')}/>

    </div>
  );
};

