import { action, observable } from "mobx";

export enum state {
    clientList = "Client list",
    clientEdit = "Edit client"
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
    currentClient: IClient;
    clients: IClient[];
    setState(newState: state): void;
    updateList(clients: IClient[]): void;
    setCurrentClient(client: IClient): void;
    loadLocalClients(): void;
}

class Store implements IStore {
    @observable
    public appState: state = state.clientList;

    public currentClient!: IClient;

    @observable
    public clients: IClient[] = [];

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
        const resp = await fetch("/users");
        const clients = await resp.json();
        this.clients = clients;
    };
}

export default new Store();
