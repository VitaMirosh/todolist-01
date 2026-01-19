import {FilterValueTitle, Task, Todolist} from './App.tsx';
import {ChangeEvent} from 'react';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';
import {Box, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'


type Props = {
  todolist: Todolist
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, filter: FilterValueTitle) => void
  createItem: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskID: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void;
}


export const TodolistItem = ({
                               todolist,
                               tasks,
                               deleteTask,
                               changeFilter,
                               createItem,
                               changeTaskStatus,
                               deleteTodolist,
                               changeTaskTitle,
                               changeTodolistTitle
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
  const changeTodolistHandler = (title: string) => {
    changeTodolistTitle(todolist.id, title)
  }

  return (
    <div>
      <div className={'container'}>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistHandler}/></h3>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon/>
        </IconButton>
      </div>

      <CreateItemForm createItem={createItemHandler}/>
      {tasks.length === 0 ? (<p>"Тасок нет"</p>) :
        <List>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(todolist.id, task.id)
            }
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(todolist.id, task.id, event.currentTarget.checked)
            }
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(todolist.id, task.id, title)
            }

            return (
              <ListItem key={task.id}
                        sx={{p: 0, justifyContent: 'space-between', opacity: task.isDone ? 0.5 : 1}}>
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
              color={'inherit'}
              onClick={() => changeFilterHandler('all')}>
        All
      </Button>
      <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
              color={'primary'}
              onClick={() => changeFilterHandler('active')}>
        Active
      </Button>
      <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
              color={'secondary'}
              onClick={() => changeFilterHandler('completed')}>
        Completed
      </Button>
      </Box>
    </div>
  );
};

