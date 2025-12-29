import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export const App = () => {
  let [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Rest API', isDone: false},
    {id: v1(), title: 'GraphQL', isDone: false},
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false};
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>('all');


  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active': {
        return tasks.filter(t => !t.isDone);
      }
      case 'completed': {
        return tasks.filter(t => t.isDone)
          ;
      }
      default: {
        return tasks
      }

    }
  }
  const filteredTasks = getFilteredTasks();

  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
              />
    </div>
  );
}
