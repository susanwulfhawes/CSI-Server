require('dotenv').config();
const express = require('express');
 //require('dotenv').config();
const app = express();
const sequelize = require('./db');
    //const fileUpload = require('express-fileupload');
const cors = require('cors');

// middleware for file upload
    //app.use(express.static('public')); // to access the files in public folder
app.use(cors()); // this enables CORS requests
    //app.use(fileUpload());

//import JSON support for Express
app.use(express.json());

let infant = require('./controllers/infantcontroller');
let user = require('./controllers/usercontroller');
let care = require('./controllers/carecontroller');

sequelize.sync();
//sequelize.sync({force: true});  //If we need to force a db change

// header configuration for client requests
    //app.use(require('./middleware/headers'));

app.use('/infant', infant);
app.use('/user', user);
app.use('/care', care);


app.listen(process.env.PORT, function(){
    console.log('The app is on port 3000');
});