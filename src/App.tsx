import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { observer } from '../node_modules/mobx-react';
import Todo from './components/Todo'
import TodoItemEdit from './components/TodoItemEdit';
import { IStore, state } from './storage/store'

interface IProps {
  store: IStore
}

@observer
class App extends React.Component<IProps> {
  public render() {
    const store = this.props.store

    let view: any

    switch (store.appState) {
      case state.clientEdit:
        view = <TodoItemEdit store={store}/>
        break;

        case state.clientList:
        view = <Todo store={store}/>
        break;
    
      default:
        view = <Todo store={store}/>
        break;
    }

    return (
      <div >
        <Grid container={true} spacing={16}>
            <Grid item={true} lg={12}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" >
                    {store.appState}
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item={true} lg={12}>
              {view}
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
