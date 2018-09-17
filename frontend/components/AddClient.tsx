import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import * as React from "react";
import { IClient, ICity, IStreet, IStore, state } from "../storage/store";
import { FormControl } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import { inject } from "mobx-react";

interface IProps {
    store?: IStore;
}

interface IState {
    tempClient: IClient;
    cities: ICity[];
    streets: IStreet[];
}

const styles = createStyles({
    button: {
        marginRight: 10
    },
    select: {
        marginBottom: 20
    }
});

@inject("store")
export default class AddClient extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            tempClient: {
                id: "",
                city: { id: "", name: "" },
                email: "",
                name: "",
                phone: "",
                street: { id: "", name: "" },
                username: ""
            },
            cities: [],
            streets: []
        };
    }

    public async getCities() {
        const resp = await fetch("/cities");
        const cities = await resp.json();
        return cities;
    }

    public async componentDidMount() {
        let resp = await fetch("/cities");
        const cities = await resp.json();
        resp = await fetch("/streets");
        const streets = await resp.json();
        this.setState({
            cities: cities,
            streets: streets
        });
    }

    public buttonHandle = () => {
        this.props.store!.setCurrentClient(this.state.tempClient);
        this.props.store!.setState(state.clientList);
        this.props.store!.addClient();
    };

    public handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cl: IClient = this.state.tempClient;
        const id: string = e.target.id;
        const value: string = e.target.value;
        cl[id] = value;
        this.setState({
            tempClient: cl
        });
    };

    public handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cl: IClient = this.state.tempClient;
        const id: string = e.target.name;
        const value = { id: e.target.value };
        cl[id] = value;
        this.setState({
            tempClient: cl
        });
    };

    public render() {
        const client = this.state.tempClient;
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
                    <Grid item={true} lg={5}>
                        <Paper>
                            <Grid container={true} justify="center">
                                <Grid item={true} lg={5}>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        value={client.name}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item={true} lg={5}>
                                    <TextField
                                        id="username"
                                        label="username"
                                        value={client.username}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container={true} justify="center">
                                <Grid item={true} lg={5}>
                                    <TextField
                                        id="email"
                                        label="email"
                                        value={client.email}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item={true} lg={5}>
                                    <TextField
                                        id="phone"
                                        label="phone"
                                        value={client.phone}
                                        onChange={this.handleChange}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container={true} justify="center">
                                <Grid item={true} lg={5}>
                                    <FormControl>
                                        <InputLabel htmlFor="city">
                                            City
                                        </InputLabel>
                                        <Select
                                            value={client.city.id}
                                            onChange={this.handleSelect}
                                            inputProps={{
                                                name: "city",
                                                id: "city"
                                            }}
                                        >
                                            {this.state.cities.map(
                                                (city, index) => {
                                                    return (
                                                        <MenuItem
                                                            value={city.id}
                                                            key={index}
                                                        >
                                                            {city.name}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} lg={5}>
                                    <FormControl>
                                        <InputLabel htmlFor="street">
                                            Street
                                        </InputLabel>
                                        <Select
                                            value={client.street.id}
                                            onChange={this.handleSelect}
                                            style={styles.select}
                                            inputProps={{
                                                name: "street",
                                                id: "street"
                                            }}
                                        >
                                            {this.state.streets.map(
                                                (street, index) => {
                                                    return (
                                                        <MenuItem
                                                            value={street.id}
                                                            key={index}
                                                        >
                                                            {street.name}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
