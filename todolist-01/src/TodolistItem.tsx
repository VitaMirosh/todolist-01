import {Task} from "./App.tsx";
import {Button} from "./Button.tsx";


type Props = {
  title:string
  tasks:Task[]

}


export const TodolistItem =({title, tasks }:Props) => {

  return (
    <div>
      <h3>{title}</h3>
      <input></input>
      <Button title={"+"}/>
      {tasks.length === 0 ? (<p>"Тасок нет"</p>):
        <ul>
          {tasks.map(task=>{
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>}


      <button>All</button>
      <button>Active</button>
      <button>Completed</button>

    </div>
  );
};

