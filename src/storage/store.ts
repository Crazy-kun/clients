import { action, observable } from 'mobx'

export enum state {
    clientList = 'Client list',
    clientEdit = 'Edit client'
}

export interface IClient {
    id: string
    name: string
    username: string
    email: string
    phone: string
    test: string
    [key: string]: string
}

export interface IStore {
    appState: state
    currentClient: IClient
    clients: IClient[]
    setState(newState: state): void
    updateList(clients: IClient[]): void
    setCurrentClient(client: IClient): void
}

class Store implements IStore {
    @observable
    public appState: state = state.clientList
    
    public currentClient: IClient = {id: '', name: '', username: '', email: '', phone: '', test: ''}

    @observable 
    public clients: IClient[] = []

    @action
    public setState = (newState: state) => {
        this.appState = newState
    }

    @action 
    public updateList = (clients: IClient[]) => {
        this.clients = clients
    }

    @action
    public setCurrentClient = (client: IClient) => {
        this.currentClient = client
    }
}

export default new Store()