import './App.css'
import {CssBaseline, ThemeProvider} from '@mui/material';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectThemeMode} from './app-selector.ts';
import {getTheme} from '../common/theme/theme.ts';
import {Main} from '@/app/Main.tsx';
import {Header} from '@/Header.tsx';



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
