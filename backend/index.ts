import "reflect-metadata"
import path from 'path'
import express from 'express'
import router from "./routes"
import {createConnection} from "typeorm"
import {User} from "./entity/User"
import webpack from 'webpack'

const webpackConfig = require('../webpack.config.js'),
   app = express(),
   port = process.env.PORT || 3000;

createConnection().then(async connection => {

    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

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
