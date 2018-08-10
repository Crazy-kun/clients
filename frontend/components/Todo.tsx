import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { IStore } from '../storage/store'
import TodoControl from './TodoControl'
import TodoList from './TodoList'

interface IProps {
    store: IStore
}

export default class Todo extends React.Component<IProps> {
  public render() {
    const store: IStore = this.props.store
    return (
      <Grid container={true} spacing={16}>
        <Grid item={true} lg={12}>
          <TodoControl updateList={this.props.store.updateList}/>
        </Grid>
        <Grid item={true} lg={12}>
          <TodoList store={store}/>
        </Grid>
      </Grid>
    );
  }
}