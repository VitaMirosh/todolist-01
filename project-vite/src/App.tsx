import './App.css'
import {useState} from 'react';
import * as React from 'react';
// const tasks=null
// const tasks = []
const tasks = [
  {
    id: 1,
    title: 'Купить продукты на неделю',
    isDone: true,
    addedAt: '1 сентября',
    priority: 2
  },
  {
    id: 2,
    title: 'Полить цветы',
    isDone: true,
    addedAt: '2 сентября',
    priority: 0
  },
  {
    id: 3,
    title: 'Сходить на тренировку',
    isDone: false,
    addedAt: '3 сентября',
    priority: 1
  },
  {
    id: 4,
    title: 'Сходить на тренировку',
    isDone: false,
    addedAt: '3 сентября',

  },
]

function App() {

  const [selectedTrackId, setSelectedTrackId] = useState<null | number>(null)

  if (tasks === null) {
    return (
      <div>
        <h1>loading...</h1>
      </div>

    )
  }
  if (tasks.length === 0) {
    return (
      <div>
        <span>No tasks</span>
      </div>

    )
  }

  return (
    <>
      <button onClick={() => setSelectedTrackId(null)}>Reset selection</button>

      <ul>
        {tasks.map((task) => {
          let style: React.CSSProperties = {};


          switch (task.priority) {
            case 0:
              style = {backgroundColor: 'white'};
              break;
            case 1:
              style = {backgroundColor: 'blue'};
              break;
            case 2:
              style = {backgroundColor: 'green'};
              break;

            default:
              style = {backgroundColor: 'red'};
          }

          return (
            <li key={task.id} style={{
              ...style,
              border: task.id === selectedTrackId ? '5px solid yellow' : '5px solid black'
            }}>
              <div onClick={() => {
                setSelectedTrackId(task.id)}}>
                <div >
                  Заголовок: <span className={task.isDone ? 'title' : ''}>{task.title}</span>
                </div>

                <div>
                  Статус:{' '}
                  <input type="checkbox" checked={task.isDone} readOnly/>
                </div>
                <div>
                  Дата создания задачи:<span> {task.addedAt}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );

}

export default App
