import './App.css'
import {CssBaseline, ThemeProvider} from '@mui/material';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectThemeMode} from './app-selector.ts';
import {getTheme} from '../common/theme/theme.ts';
import Header from '@/Header.tsx';
import Main from '@/app/Main.tsx';


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

  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline/>
        < Header/>
        <Main/>
      </div>
    </ThemeProvider>
  )
}

export default App
