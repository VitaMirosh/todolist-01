import {FilterValueTitle, Task, Todolist} from './App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm.tsx';


type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValueTitle) => void
  createItem: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
}


export const TodolistItem = ({
                               todolist,
                               tasks,
                               deleteTask,
                               changeFilter,
                               createItem,
                               changeTaskStatus,
                               deleteTodolist
                             }: Props) => {


  const changeFilterHandler = (filter: FilterValueTitle) => {
    changeFilter(todolist.id, filter)
  }
  const deleteTodolistHandler = () => {
    deleteTodolist(todolist.id)
  }
  const createItemHandler = (title: string) => {
    createItem(todolist.id, title)
  }

  return (
    <div>
      <div className={'container'}>
        <h3>{todolist.title}</h3>
        <Button title={'x'} onClick={deleteTodolistHandler}/>
      </div>

      <CreateItemForm createItem={createItemHandler}/>
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

