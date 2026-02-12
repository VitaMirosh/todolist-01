import {AppBar, Container, IconButton, Switch, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from '@/NavButton.ts';
import {changeThemeModeAC} from '@/app/app-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectThemeMode} from '@/app/app-selector.ts';
import {getTheme} from '@/common/theme/theme.ts';

export const Header = () => {

  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
  }

  return (
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
  );
};

