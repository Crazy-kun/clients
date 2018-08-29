import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { IStore, IClient } from '../storage/store'
import { observer } from 'mobx-react';

interface IProps {
    store: IStore
}

@observer
export default class TodoControl extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props)
        this.updateHandleButton = this.updateHandleButton.bind(this)
        this.saveHandleButton = this.saveHandleButton.bind(this)
    }
    
    public async updateHandleButton() {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users")
        const clients = await resp.json()
        this.props.store.updateList(clients)
    }

    public loadHandleButton = () => {
        this.props.store.loadLocalClients()
    }

    public async saveHandleButton() {
        const users = this.props.store.clients.slice()
        await fetch('/saveusers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                users: users
            })
        })
    }

    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} md={1}>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.updateHandleButton}
                    >
                        Update
                    </Button>
                </Grid>
                <Grid item={true} md={1}>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.saveHandleButton}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item={true} md={2}>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.loadHandleButton}
                    >
                        Load local
                    </Button>
                </Grid>
            </Grid>
        );
    }
}