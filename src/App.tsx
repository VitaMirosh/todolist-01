import './App.css'
import {TodolistItem} from './TodolistItem.tsx';
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper, Switch,
  ThemeProvider,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from './NavButton.ts';
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer
} from './model/todolists-reducer.ts';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC, createTodolistTasksAC,
  deleteTaskAC,
  tasksReducer
} from './model/tasks-reducer.ts';


type ThemeMode = 'dark' | 'light'


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

  const todolistId1 = v1()
  const todolistId2 = v1()


  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
  ]);
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
      [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
      ],
      [todolistId2]: [
        {id: v1(), title: 'Rest Api', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: true},
        {id: v1(), title: 'Next', isDone: false},
        {id: v1(), title: 'Unitest', isDone: false}
      ],
    }
  )

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })
  const changeMode = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }


  const deleteTask = (todolistId: string, taskId: string) => {
    dispatchToTasks(deleteTaskAC({id: todolistId, taskId}))
  }


  const changeFilter = (id: string, filter: FilterValueTitle) => {
    dispatchToTodolists(changeTodolistFilterAC({id, filter}));
  }

  const createTask = (todolistId: string, title: string) => {
    dispatchToTasks(createTaskAC({id: todolistId, title}))
  }

  const changeTaskStatus = (id: string, taskID: string, isDone: boolean) => {
    dispatchToTasks(changeTaskStatusAC({id, taskID, isDone}))
  }
  const deleteTodolist = (id: string) => {
    dispatchToTodolists(deleteTodolistAC(id))
    dispatchToTasks(deleteTodolistAC(id))
  }
  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(createTodolistTasksAC(action.payload.id))
  }
  const changeTaskTitle = (id: string, taskID: string, title: string) => {
    const newTaskTitle = changeTaskTitleAC({id, taskID, title})
    dispatchToTasks(newTaskTitle)
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}));
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
            {todolists?.map(todolist => {
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
