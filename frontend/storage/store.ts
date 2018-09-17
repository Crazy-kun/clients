import { action, observable } from "mobx";

export enum state {
    clientList = "Client list",
    clientEdit = "Edit client",
    auth = "Authentication",
    clientAdd = "Adding new client"
}

export interface IClient {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    city: ICity;
    street: IStreet;
    [key: string]: any;
}

export interface ICity {
    id: string;
    name: string;
}

export interface IStreet {
    id: string;
    name: string;
}

export interface IStore {
    appState: state;
    username: string;
    currentClient: IClient;
    clients: IClient[];
    rowsPerPage: number;
    page: number;
    rowsCount: number;
    setState(newState: state): void;
    updateList(clients: IClient[]): void;
    setCurrentClient(client: IClient): void;
    loadLocalClients(): void;
    addClient(): void;
}

class Store implements IStore {
    @observable
    public appState: state = state.auth;

    @observable
    public username: string = "";

    public currentClient!: IClient;

    @observable
    public clients: IClient[] = [];

    @observable
    public rowsPerPage: number = 5;

    @observable
    public page: number = 0;

    @observable
    public rowsCount: number = 0;

    @action
    public setState = (newState: state) => {
        this.appState = newState;
    };

    @action
    public updateList = (clients: IClient[]) => {
        this.clients = clients;
    };

    @action
    public setCurrentClient = (client: IClient) => {
        this.currentClient = client;
    };

    @action
    public loadLocalClients = async () => {
        const resp = await fetch(
            `/users?count=${this.rowsPerPage}&page=${this.page}`
        );
        const clients = await resp.json();
        this.clients = clients.users;
        this.rowsCount = clients.count;
    };

    @action
    public addClient = () => {
        if (
            this.currentClient.name != "" &&
            this.currentClient.username != "" &&
            this.currentClient.email != ""
        ) {
            this.clients.push(this.currentClient);
        }
    };
}

export default new Store();
