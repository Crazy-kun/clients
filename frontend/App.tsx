import AppBar from "@material-ui/core/AppBar";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { observer } from "../node_modules/mobx-react";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
import TodoItemEdit from "./components/TodoItemEdit";
import AddClient from "./components/AddClient";
import Chat from "./components/Chat";
import { IStore, state } from "./storage/store";
import { inject } from "mobx-react";

interface IProps {
    store?: IStore;
    client: any;
}

interface IState {
    menuOpen: boolean;
    anchorEL: null;
}

let store: IStore;

@inject("store")
@observer
class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        store = this.props.store!;
        this.state = {
            menuOpen: false,
            anchorEL: null
        };

        this.props.store!.socket.on("msg", (msg: any) => {
            store.handleMessage(msg);
        });
    }

    public componentDidMount = async () => {
        let res = await fetch("/checkauth");
        let resp = await res.json();
        if (resp.check) {
            store.appState = state.clientList;
            store.username = resp.username;
        }
    };

    public handleMenu = (e: any) => {
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEL: e.currentTarget
        });
    };

    public logout = async () => {
        await fetch("/logout");
        this.setState({
            menuOpen: false,
            anchorEL: null
        });
        store.username = "";
        store.appState = state.auth;
    };

    public handleSnackbarClose = () => {
        store.snackbarOpen = false;
    };

    public handleSnackbarClick = () => {
        store.appState = state.chat;
    };

    public render() {
        let view: any;

        switch (store.appState) {
            case state.auth:
                view = <Auth />;
                break;

            case state.clientEdit:
                view = <TodoItemEdit />;
                break;

            case state.clientAdd:
                view = <AddClient />;
                break;

            case state.clientList:
                view = <Todo client={this.props.client} />;
                break;

            case state.chat:
                view = <Chat />;
                break;

            default:
                view = <Todo client={this.props.client} />;
                break;
        }

        return (
            <div>
                <Grid container={true} spacing={16}>
                    <Grid item={true} sm={12}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton color="inherit" aria-label="Menu">
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    variant="title"
                                    color="inherit"
                                    style={{ flex: 1 }}
                                >
                                    {store.appState}
                                </Typography>
                                <Button
                                    color="inherit"
                                    onClick={this.handleMenu}
                                >
                                    {store.username}
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEL}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={this.state.menuOpen}
                                    onClose={this.handleMenu}
                                >
                                    <MenuItem onClick={this.logout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item={true} lg={12}>
                        {view}
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={store.snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={
                        <div>
                            <span id="message-id">{store.newMessage.text}</span>
                            <Typography
                                variant="caption"
                                color="secondary"
                                gutterBottom
                            >
                                {store.newMessage.username}
                            </Typography>
                        </div>
                    }
                    action={[
                        <Button
                            key="undo"
                            color="primary"
                            size="small"
                            onClick={this.handleSnackbarClick}
                        >
                            <span style={{ color: "white" }}>OPEN</span>
                        </Button>
                    ]}
                />
            </div>
        );
    }
}

export default App;
