import AppBar from "@material-ui/core/AppBar";
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

interface IProps {
    store: IStore;
    client: any;
}

interface IState {
    menuOpen: boolean;
    anchorEL: null;
}

@observer
class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            menuOpen: false,
            anchorEL: null
        };

        this.props.store.socket.on("msg", (msg: any) => {
            this.props.store.handleMessage(msg);
        });
    }

    public componentDidMount = async () => {
        let res = await fetch("/checkauth");
        let resp = await res.json();
        if (resp.check) {
            this.props.store.appState = state.clientList;
            this.props.store.username = resp.username;
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
        this.props.store.username = "";
        this.props.store.appState = state.auth;
    };

    public render() {
        const store = this.props.store;
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
                                    {this.props.store.username}
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
            </div>
        );
    }
}

export default App;
