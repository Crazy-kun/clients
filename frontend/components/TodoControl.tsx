import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { inject } from 'mobx-react';
import * as React from 'react';
import { IClient } from '../storage/store'

interface IProps {
    updateList(clients: IClient[]): void
}

@inject('store')
export default class TodoControl extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props)
        this.handleButton = this.handleButton.bind(this)
    }
    
    public async handleButton() {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users")
        const clients = await resp.json()
        this.props.updateList(clients)
    }

    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} md={4}>
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleButton}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        );
    }
}