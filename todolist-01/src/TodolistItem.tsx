import {FilterValueTitle, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';


type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValueTitle) => void
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;


}


export const TodolistItem = ({todolist, tasks, deleteTask, changeFilter, createTask, changeTaskStatus}: Props) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      createTask(todolist.id, taskTitle.trim())
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

  const changeFilterHandler = (filter: FilterValueTitle) => {
    changeFilter(todolist.id, filter)
  }
  return (
    <div>
      <h3>{todolist.title}</h3>
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
              deleteTask(todolist.id, task.id)
            }
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(todolist.id, task.id, event.currentTarget.checked)
            }

            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Button title={'x'} onClick={deleteTaskHandler}/>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>}


      <Button className={todolist.filter === 'all' ? 'active-filter' : ''} title={'All'}
              onClick={() => changeFilterHandler('all')}/>
      <Button className={todolist.filter === 'active' ? 'active-filter' : ''} title={'Active'}
              onClick={() => changeFilterHandler('active')}/>
      <Button className={todolist.filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
              onClick={() => changeFilterHandler('completed')}/>

    </div>
  );
};

