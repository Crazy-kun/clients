import { action, observable } from 'mobx'

export enum state {
    clientList = 'Client list',
    clientEdit = 'Edit client'
}

export interface IStore {
    name: string
    appState: state
    setState(newState: state): void
}

class Store implements IStore {
    @observable
    public appState: state = state.clientList

    @observable
    public name: string = 'MobX'
    
    @action
    public setState = (newState: state) => {
        this.appState = newState
    }
}

export default new Store()