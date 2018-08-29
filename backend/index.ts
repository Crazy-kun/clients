import "reflect-metadata"
import path from 'path'
import express from 'express'
import router from "./routes"
import {createConnection} from "typeorm"
import webpack from 'webpack'

const webpackConfig = require('../webpack.config.js'),
   app = express(),
   bodyParser = require("body-parser"),
   port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createConnection().then(async connection => {

    app.listen(port, () => { 
        console.log(`App is listening on port ${port}`) 
    });
    
}).catch(error => console.log(error));

app.use('/', router)

let compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'dist')));
