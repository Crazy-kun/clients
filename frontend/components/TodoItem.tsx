import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { IClient, IStore, state } from "../storage/store";
import { inject } from "mobx-react";
import { observer } from "mobx-react";

interface IProps {
    client: IClient;
    store: IStore;
}

@inject("store")
@observer
export default class TodoItem extends React.Component<IProps> {
    public rowClickHandle = (e: any) => {
        this.props.store.setCurrentClient(this.props.client);
        this.props.store.setState(state.clientEdit);
    };

    public render() {
        const client = this.props.client;
        return (
            <TableRow onClick={this.rowClickHandle} hover={true}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.username}</TableCell>
                <TableCell>{client.email}</TableCell>
            </TableRow>
        );
    }
}
