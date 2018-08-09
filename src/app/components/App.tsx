import * as React from 'react';
import { IStore } from '../storage/store'

interface IProps {
    store: IStore,
   compiler: string,
   framework: string,
   bundler: string
}

export class App extends React.Component<IProps, {}> {
   render() {
   return <h1>This is a {this.props.framework} application using {this.props.compiler} with {this.props.bundler} and {this.props.store.name}</h1>
   }
}