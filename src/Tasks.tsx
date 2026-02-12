import {Checkbox, IconButton, List, ListItem} from '@mui/material';
import {getListItemSx} from '@/TodolistItem.styles.ts';
import {EditableSpan} from '@/EditableSpan.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from '@/model/tasks-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/model/tasks-selector.ts';
import {Todolist} from '@/model/todolists-reducer.ts';
import {ChangeEvent} from 'react';


type Props = {
  todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
  const {id, filter} = todolist;

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch();
  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === 'active') {
    filteredTasks = todolistTasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = todolistTasks.filter(task => task.isDone)
  }
  return (
    <>
      {
        filteredTasks.length === 0 ? (<p>"Тасок нет"</p>) :
          <List>
            {filteredTasks.map(task => {
              const deleteTaskHandler = () => {
                dispatch(deleteTaskAC({id: id, taskId: task.id}))
              }
              const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC({id: id, taskID: task.id, isDone: event.currentTarget.checked}))
              }
              const changeTaskTitleHandler = (title: string) => {
                dispatch(changeTaskTitleAC({id: id, taskID: task.id, title}))
              }
              return (
                <ListItem key={task.id}
                          sx={getListItemSx(task.isDone)}>
                  <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                  </div>
                  <IconButton onClick={deleteTaskHandler}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItem>
              )
            })}
          </List>}
      )
    </>

  )
};

