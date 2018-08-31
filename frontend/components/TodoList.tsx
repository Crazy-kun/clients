import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { observer } from "mobx-react";

import { IStore } from "../storage/store";
import TodoItem from "./TodoItem";

interface IProps {
    store: IStore;
}

@observer
export default class TodoList extends React.Component<IProps> {
    public render() {
        const store: IStore = this.props.store;
        const clients = this.props.store.clients;
        let items: {} | null;
        if (clients.length === 0) {
            items = null;
        } else {
            items = clients.map((client, index) => {
                return <TodoItem key={index} client={client} store={store} />;
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
            </Paper>
        );
    }
}
