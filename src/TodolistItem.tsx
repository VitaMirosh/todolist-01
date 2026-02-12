import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';
import {Box, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import {containerSx, getListItemSx} from './TodolistItem.styles.ts';
import {changeTodolistFilterAC, FilterValueTitle, Todolist} from '@/model/todolists-reducer.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/model/tasks-selector.ts';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/model/tasks-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistTitle} from '@/TodolistTitle.tsx';


type Props = {
  todolist: Todolist
}


export const TodolistItem = ({todolist}:Props)=>{
  const {id,filter}=todolist

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
  const changeFilterHandler = (filter: FilterValueTitle) => {
    dispatch(changeTodolistFilterAC({id, filter}));
  }

  const createItemHandler = (title: string) => {
    dispatch(createTaskAC({id: id, title}))
  }


  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm createItem={createItemHandler}/>
      {filteredTasks.length === 0 ? (<p>"Тасок нет"</p>) :
        <List>
          {filteredTasks.map(task => {
            const deleteTaskHandler = () => {
              dispatch(deleteTaskAC({id: id, taskId: task.id}))
            }
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC({id: id, taskID: task.id, isDone: event.currentTarget.checked}))
            }
            const changeTaskTitleHandler = (title: string) => {
              dispatch(changeTaskTitleAC({id:id, taskID:task.id, title}))
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

      <Box sx={containerSx}>
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterHandler('all')}>
          All
        </Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterHandler('active')}>
          Active
        </Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterHandler('completed')}>
          Completed
        </Button>
      </Box>
    </div>
  );
};

