import { action, observable } from "mobx";
import io from "socket.io-client";
import _ from "lodash";

export enum state {
    clientList = "Client list",
    clientEdit = "Edit client",
    clientAdd = "Adding new client",
    auth = "Authentication",
    chat = "Websocket chat"
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

export interface IMessage {
    id: string;
    username: string;
    text: string;
}

export interface IStore {
    appState: state;
    username: string;
    currentClient: IClient;
    clients: IClient[];
    rowsPerPage: number;
    page: number;
    rowsCount: number;
    socket: any;
    messages: IMessage[];
    unreadMessages: number;
    newMessage: IMessage;
    snackbarOpen: boolean;
    setState(newState: state): void;
    updateList(clients: IClient[]): void;
    setCurrentClient(client: IClient): void;
    loadLocalClients(): void;
    addClient(): void;
    handleMessage(message: IMessage): void;
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

    public socket: any = io("http://localhost:3000");

    @observable
    public messages: IMessage[] = [];

    @observable
    public unreadMessages: number = 0;

    @observable
    public snackbarOpen: boolean = false;

    public newMessage: IMessage = { id: "", text: "", username: "" };

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

    @action
    public handleMessage = (message: IMessage) => {
        this.messages.push(message);
        if (this.messages.length > 10) {
            this.messages = _.tail(this.messages);
        }
        if (this.appState != state.chat) {
            this.unreadMessages++;
            this.snackbarOpen = true;
            this.newMessage = message;
        }
    };
}

export default new Store();
