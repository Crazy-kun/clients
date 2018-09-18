import "reflect-metadata";
import path from "path";
import express from "express";
import router from "./routes";
import { createConnection, ConnectionOptions } from "typeorm";
import ORMConfig from "../configs/ORMconfig";
import webpack from "webpack";
import { schema, root } from "./graphql/schema";
import RabbitMQ from "./amqp/index";
import session from "express-session";
import http from "http";
import sock from "socket.io";

const webpackConfig = require("../webpack.config.js"),
    app = express(),
    bodyParser = require("body-parser"),
    expressGraphQL = require("express-graphql"),
    MongoStore = require("connect-mongo")(session),
    port = process.env.PORT || 3000;

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sessions
app.use(
    session({
        secret: "foo",
        store: new MongoStore({
            url: `mongodb://${process.env.MONGO_USER}:${
                process.env.MONGO_PASSWORD
            }@${process.env.MONGO_HOST}/clients_session`
        })
    })
);

app.use("/users", function(req, res, next) {
    console.log("Request Type:", req.method);
    next();
});

//WebSocket
const server = http.createServer(app);
const io = sock(server);
io.on("connection", function(socket: sock.Socket) {
    socket.on("message", (data: any) => {
        console.log(`Message from client ${socket.id}: `, data);
        io.emit("msg", {
            id: socket.id,
            text: data.text,
            username: data.username
        });
    });
});

io.emit("msg", "BROADCAST");

//Database connection
createConnection(<ConnectionOptions>ORMConfig)
    .then(async connection => {
        console.log("DB connection success");
        server.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
        RabbitMQ.createConnection();
        console.log("RabbitMQ connection success");
    })
    .catch(error => console.log(error));

//GraphQL
app.use(
    "/graphql",
    expressGraphQL({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);

//Express router
app.use("/", router);

//Hot module replacement
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
