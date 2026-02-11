import {Container, Grid, Paper} from '@mui/material';
import {CreateItemForm} from '@/CreateItemForm.tsx';
import {TodolistItem} from '@/TodolistItem.tsx';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import { FilterValueTitle } from './App';
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC
} from '@/model/todolists-reducer.ts';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '@/model/tasks-reducer.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTodolists} from '@/model/todolists-selector.ts';
import {selectTasks} from '@/model/tasks-selector.ts';


const Main = () => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch();


  const changeFilter = (todolistId: string, filter: FilterValueTitle) => {
    dispatch(changeTodolistFilterAC({id: todolistId, filter}));
  }
  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))

  }
  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({id: todolistId}))

  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({id: todolistId, title}));
  }
  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({id: todolistId, taskId}))
  }

  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC({id: todolistId, title}))
  }

  const changeTaskStatus = (todolistId: string, taskID: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC({id: todolistId, taskID, isDone}))
  }


  const changeTaskTitle = (todolistId: string, taskID: string, title: string) => {
    const newTaskTitle = changeTaskTitleAC({id: todolistId, taskID, title})
    dispatch(newTaskTitle)
  }


  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{mb: '30px'}}>
        <CreateItemForm createItem={createTodolist}/>
      </Grid>


      <Grid container spacing={4}>
        {todolists.map(todolist => {
            const todolistTasks = tasks[todolist.id]
            let filteredTasks = todolistTasks
            if (todolist.filter === 'active') {
              filteredTasks = todolistTasks.filter(task => !task.isDone)
            }
            if (todolist.filter === 'completed') {
              filteredTasks = todolistTasks.filter(task => task.isDone)
            }
            return <Grid key={todolist.id}>
              <Paper sx={{p: '0 20px 20px 20px'}}>
                <TodolistItem
                  todolist={todolist}
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
                  createItem={createTask}
                  changeTaskStatus={changeTaskStatus}
                  deleteTodolist={deleteTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          }
        )}
      </Grid>
    </Container>
  );
};

export default Main;