import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

const path = require('path'),
   express = require('express'),
   webpack = require('webpack'),
   webpackConfig = require('../webpack.config.js'),
   app = express(),
   port = process.env.PORT || 3000;

createConnection().then(async connection => {

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
    
    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);
     
    console.log("Here you can setup and run express/koa/any other framework.");

    app.listen(port, () => { 
        console.log(`App is listening on port ${port}`) 
    });
    
}).catch(error => console.log(error));

app.get('/', (req: any, res: any) => {
   res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

let compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
   noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'dist')));
