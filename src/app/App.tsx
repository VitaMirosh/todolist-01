import './App.css'
import {TodolistItem} from '../TodolistItem.tsx';
import {CreateItemForm} from '../CreateItemForm.tsx';
import {AppBar, Container, CssBaseline, Grid, IconButton, Paper, Switch, ThemeProvider, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from '../NavButton.ts';
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC
} from '../model/todolists-reducer.ts';
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from '../model/tasks-reducer.ts';
import {useAppDispatch} from '../common/hooks/useAppDispatch.ts';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectTodolists} from '../model/todolists-selector.ts';
import {selectTasks} from '../model/tasks-selector.ts';
import {changeThemeModeAC} from './app-reducer.ts';
import {selectThemeMode} from './app-selector.ts';
import {getTheme} from '../common/theme/theme.ts';


export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type Todolist = {
  id: string
  title: string
  filter: FilterValueTitle
}
export type TasksState = {
  [key: string]: Task[]
}
export type FilterValueTitle = 'all' | 'active' | 'completed';

function App() {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const themeMode = useAppSelector(selectThemeMode)


  const dispatch = useAppDispatch();
  const theme = getTheme(themeMode);


  const changeMode = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
  }


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
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <AppBar position="static" sx={{mb: '30px'}}>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Container maxWidth={'lg'} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <IconButton color="inherit">
                <MenuIcon/>
              </IconButton>
              <div>
                <NavButton color="inherit">Sign in</NavButton>
                <NavButton color="inherit">Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                <Switch color={'default'} onChange={changeMode}></Switch>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
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
      </div>
    </ThemeProvider>
  )
}

export default App
