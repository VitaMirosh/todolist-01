import {FilterValueTitle, Task} from './App.tsx';
import {Button} from './Button.tsx';


type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: number) => void
  changeFilter:(filter:FilterValueTitle)=>void

}


export const TodolistItem = ({title, tasks, deleteTask,changeFilter}: Props) => {

  return (
    <div>
      <h3>{title}</h3>
      <input></input>
      <Button title={'+'}/>
      {tasks.length === 0 ? (<p>"Тасок нет"</p>) :
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <Button title={'x'} onClick={() => deleteTask(task.id)}/>
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

