import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import { IStore, state } from "../storage/store";
import { createStyles } from "@material-ui/core";
import { inject } from "mobx-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import MessageIcon from "@material-ui/icons/Message";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";

interface IProps {
    store?: IStore;
}

interface IState {
    message: string;
}

const styles = createStyles({
    button: {
        marginRight: 10
    },
    textfield: {
        marginLeft: 25
    }
});

@inject("store")
@observer
export default class Chat extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            message: ""
        };
        this.props.store!.unreadMessages = 0;
    }
    public buttonHandle = () => {
        this.props.store!.setState(state.clientList);
    };

    public handleChange = (e: any) => {
        this.setState({
            message: e.target.value
        });
    };

    public sendMessage = () => {
        this.props.store!.socket.emit("message", {
            text: this.state.message,
            username: this.props.store!.username
        });
        this.setState({
            message: ""
        });
    };

    public render() {
        return (
            <div>
                <Grid container={true}>
                    <Grid item={true} lg={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={styles.button}
                            onClick={this.buttonHandle}
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>

                <Grid container={true} justify="center">
                    <Grid item={true} lg={7}>
                        <Paper>
                            <Grid container={true}>
                                <Grid item={true} lg={12}>
                                    <List>
                                        {this.props.store!.messages.map(
                                            (msg, index) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <Avatar>
                                                            <MessageIcon />
                                                        </Avatar>
                                                        <ListItemText
                                                            primary={msg.text}
                                                            secondary={
                                                                msg.username
                                                            }
                                                        />
                                                    </ListItem>
                                                );
                                            }
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container={true}>
                                <Grid item={true} lg={10}>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        value={this.state.message}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        style={styles.textfield}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.sendMessage}
                                    >
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
