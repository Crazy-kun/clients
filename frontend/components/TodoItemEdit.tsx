import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { IClient, IStore, state } from '../storage/store'

interface IProps {
    store: IStore
}

interface IState {
    tempClient: IClient
}

export default class TodoItemEdit extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            tempClient: this.props.store.currentClient
        }
    }

    public buttonHandle = () => {
        this.props.store.setCurrentClient(this.state.tempClient)
        this.props.store.setState(state.clientList)
    }

    public handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cl: IClient = this.state.tempClient
        const id: string = e.target.id
        const value: string = e.target.value
        cl[id] = value
        this.setState({
            tempClient: cl
        })
    }

    public render() {
        const client = this.state.tempClient
        return (
            <div>
                <Grid container={true}>
                    <Grid item={true} lg={12}>
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={this.buttonHandle}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>

               <Grid container={true} justify="center">
                <Grid item={true} lg={5}>
                    <Paper>
                        <Grid container={true} justify="center">
                            <Grid item={true} lg={5}>
                                <TextField
                                id="name"
                                label="Name"
                                value={client.name}
                                onChange={this.handleChange}
                                margin="normal"
                                />
                            </Grid>
                            <Grid item={true} lg={5}>
                                <TextField
                                id="username"
                                label="username"
                                value={client.username}
                                onChange={this.handleChange}
                                margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <Grid container={true} justify="center">
                            <Grid item={true} lg={5}>
                                <TextField
                                id="email"
                                label="email"
                                value={client.email}
                                onChange={this.handleChange}
                                margin="normal"
                                />
                            </Grid>
                            <Grid item={true} lg={5}>
                                <TextField
                                id="phone"
                                label="phone"
                                value={client.phone}
                                onChange={this.handleChange}
                                margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
               </Grid>

            </div>
        );
    }
}