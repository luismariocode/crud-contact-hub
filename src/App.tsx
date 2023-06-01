//import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/dm-sans/700.css';
// import { Button, TextField, Grid, Box } from '@mui/material';

const theme = createTheme();
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
     <Router>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/dashboard/:idUser" component={Dashboard} />
      </Switch>
    </Router>
    </ThemeProvider >
  );
}

export default App;
