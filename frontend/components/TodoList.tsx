import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { observer } from "mobx-react";
import { createStyles } from "@material-ui/core";

import { IStore, state } from "../storage/store";
import TodoItem from "./TodoItem";
import { inject } from "mobx-react";

interface IProps {
    store?: IStore;
}

const styles = createStyles({
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20
    }
});

@inject("store")
@observer
export default class TodoList extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    public addButtonHandle = () => {
        this.props.store!.appState = state.clientAdd;
    };

    public handleChangePage = (e: any, page: number) => {
        this.props.store!.page = page;
        this.props.store!.loadLocalClients();
    };

    public handleChangeRowsPerPage = (e: any) => {
        this.props.store!.rowsPerPage = e.target.value;
        this.props.store!.loadLocalClients();
    };

    public render() {
        const store: IStore = this.props.store!;
        const clients = this.props.store!.clients;
        let items: {} | null;
        if (clients.length === 0) {
            items = null;
        } else {
            items = clients.map((client, index) => {
                return <TodoItem key={index} client={client} />;
            });
        }
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    {items === null ? null : <TableBody>{items}</TableBody>}
                </Table>
                <TablePagination
                    component="div"
                    count={store.rowsCount}
                    rowsPerPage={store.rowsPerPage}
                    page={store.page}
                    backIconButtonProps={{
                        "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                        "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Button
                    variant="fab"
                    color={"primary"}
                    style={styles.fab}
                    onClick={this.addButtonHandle}
                >
                    <AddIcon />
                </Button>
            </Paper>
        );
    }
}
