import "reflect-metadata";
import path from "path";
import express from "express";
import router from "./routes";
import { createConnection } from "typeorm";
import webpack from "webpack";
import { schema, root } from "./graphql/schema";

const webpackConfig = require("../webpack.config.js"),
    app = express(),
    bodyParser = require("body-parser"),
    expressGraphQL = require("express-graphql"),
    { buildSchema } = require("graphql"),
    port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createConnection()
    .then(async connection => {
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    })
    .catch(error => console.log(error));

app.use(
    "/graphql",
    expressGraphQL({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

app.use("/", router);

let compiler = webpack(webpackConfig);

app.use(
    require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
    })
);

app.use(require("webpack-hot-middleware")(compiler));
app.use(express.static(path.resolve(__dirname, "dist")));
