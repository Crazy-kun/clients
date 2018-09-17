import Grid from "@material-ui/core/Grid";
import * as React from "react";
import TodoControl from "./TodoControl";
import TodoList from "./TodoList";

interface IProps {
    client: any;
}

export default class Todo extends React.Component<IProps> {
    public render() {
        return (
            <Grid container={true} spacing={16}>
                <Grid item={true} lg={12}>
                    <TodoControl client={this.props.client} />
                </Grid>
                <Grid item={true} lg={12}>
                    <TodoList />
                </Grid>
            </Grid>
        );
    }
}
