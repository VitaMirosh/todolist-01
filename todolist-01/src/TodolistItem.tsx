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
  filter?: FilterValueTitle;

}


export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter}: Props) => {
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
              <li key={task.id} className={task.isDone?"is-done":''}>
                <Button title={'x'} onClick={deleteTaskHandler}/>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>}


      <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilter('all')}/>
      <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
              onClick={() => changeFilter('active')}/>
      <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
              onClick={() => changeFilter('completed')}/>

    </div>
  );
};

