import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as React from "react";
import { IStore, state } from "../storage/store";
import { observer } from "mobx-react";
import gql from "graphql-tag";
import * as _ from "lodash";
import { createStyles } from "@material-ui/core";
import { inject } from "mobx-react";
import MsgDialog from "./MsgDialog";

interface IProps {
    store?: IStore;
    client: any;
}

interface IState {
    msg: string;
    wsMsg: string;
    srvMsg: string;
    open: boolean;
}

const styles = createStyles({
    button: {
        marginRight: 20
    }
});

@inject("store")
@observer
export default class TodoControl extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            msg: "",
            wsMsg: "",
            srvMsg: "",
            open: false
        };
        this.updateHandleButton = this.updateHandleButton.bind(this);
        this.saveHandleButton = this.saveHandleButton.bind(this);
    }

    public closeMsg = () => {
        this.setState({
            open: false,
            srvMsg: ""
        });
    };

    public async updateHandleButton() {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const clients = await resp.json();
        this.props.store!.updateList(clients);
    }

    public loadHandleButton = () => {
        this.props.store!.loadLocalClients();
    };

    public async saveHandleButton() {
        const users = this.props.store!.clients.slice();
        await fetch("/saveusers", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                users: users
            })
        });
    }

    public test = async () => {
        let resp = await this.props.client.query({
            query: gql`
                {
                    users {
                        id
                        name
                        email
                    }
                }
            `
        });
        let users = resp.data.users;
    };

    public chat = () => {
        this.props.store!.setState(state.chat);
    };

    public onMessageChange = (e: any) => {
        this.setState({
            msg: e.target.value
        });
    };

    public onWsMessageChange = (e: any) => {
        this.setState({
            wsMsg: e.target.value
        });
    };

    public rabbitTest = async () => {
        let resp = await fetch("/rabbitmq", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                msg: this.state.msg
            })
        });
        let response = await resp.json();
        console.log(response);
    };

    public wsTest = () => {
        this.props.store!.socket.emit("message", this.state.wsMsg);
        this.setState({
            wsMsg: ""
        });
    };

    public render() {
        let chatButton = (
            <Button variant="contained" color="primary" onClick={this.chat}>
                Chat
            </Button>
        );
        if (this.props.store!.unreadMessages != 0) {
            chatButton = (
                <Badge
                    color="secondary"
                    badgeContent={this.props.store!.unreadMessages}
                >
                    {chatButton}
                </Badge>
            );
        }
        return (
            <Grid container={true}>
                <Grid item={true} sm={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={this.updateHandleButton}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={this.saveHandleButton}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={this.loadHandleButton}
                    >
                        Load local
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={styles.button}
                        onClick={this.test}
                    >
                        Graphql test
                    </Button>
                    {chatButton}
                </Grid>
                <Grid item={true} sm={4}>
                    <TextField
                        id="message"
                        label="Message"
                        value={this.state.msg}
                        onChange={this.onMessageChange}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.rabbitTest}
                    >
                        RabbitMQ test
                    </Button>
                </Grid>
                <Grid item={true} sm={4}>
                    <TextField
                        id="wsmsg"
                        label="message"
                        value={this.state.wsMsg}
                        onChange={this.onWsMessageChange}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.wsTest}
                    >
                        WebSocket test
                    </Button>
                </Grid>
                <MsgDialog
                    open={this.state.open}
                    message={this.state.srvMsg}
                    closeMsg={this.closeMsg}
                />
            </Grid>
        );
    }
}
