import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { IStore, state } from "../storage/store";
import { inject } from "mobx-react";

interface IProps {
    store?: IStore;
}

interface IState {
    username: string;
    password: string;
    msg: string;
}

@inject("store")
export default class Auth extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            msg: ""
        };
    }
    public login = async () => {
        let res = await fetch("/auth", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });
        res = await res.json();
        if (res) {
            this.props.store!.username = this.state.username;
            this.props.store!.appState = state.clientList;
        } else {
            this.setState({
                msg: "Incorrect login or password"
            });
        }
    };

    public handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const field: string = e.target.id;
        const value: string = e.target.value;
        let state: any = {};
        state[field] = value;
        this.setState(state);
    };

    public render() {
        return (
            <Grid container={true} justify="center">
                <Grid item={true} lg={2}>
                    <Paper>
                        <Grid container={true} justify="center" spacing={16}>
                            <Grid item={true} lg={8}>
                                <Grid container={true} justify="center">
                                    <Grid item={true}>
                                        <Typography
                                            variant="subheading"
                                            color="error"
                                        >
                                            {this.state.msg}
                                        </Typography>
                                        <TextField
                                            id="username"
                                            label="username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="password"
                                            label="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            margin="normal"
                                        />
                                        <Button
                                            fullWidth={true}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.login}
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
