import {FilterValueTitle, Task} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';


type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValueTitle) => void
  createTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;

}


export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus}: Props) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      createTask(taskTitle.trim())
      setTaskTitle('')

    } else {
      setError('Title is required')
    }

  }
  const changeTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)

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
             onKeyDown={createTaskOnEnterHandler}
             className={error ? 'error' : ''}/>
      <Button title={'+'} onClick={createTaskHandler}/>

      {error && <div className={'error-message'}>{error}</div>}

      {tasks.length === 0 ? (<p>"Тасок нет"</p>) :
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(task.id)
            }
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(task.id, event.currentTarget.checked)
            }

            return (
              <li key={task.id}>
                <Button title={'x'} onClick={deleteTaskHandler}/>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
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

