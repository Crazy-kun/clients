import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import Store from "./storage/store";
import ApolloClient from "apollo-boost";
import { Provider } from "mobx-react";

declare let module: any;

const client = new ApolloClient({
    uri: "/graphql"
});

ReactDOM.render(
    <Provider store={Store}>
        <App store={Store} client={client} />
    </Provider>,
    document.getElementById("root") as HTMLElement
);

if (module.hot) {
    module.hot.accept();
}
