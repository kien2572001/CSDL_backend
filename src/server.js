import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
//const uploadRouter = require('./routes/upload');
var cors = require('cors')
require('dotenv').config();


const app = express()
app.use(cors())
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_ADDRESS);

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use('/uploads', uploadRouter);

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969 //Neu ko ton tai thi se la 6969



app.listen(port,()=>{
    console.log("Backend nodejs is running on PORT: "+ port)
})
