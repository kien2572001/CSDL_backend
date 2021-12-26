import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
require('dotenv').config();


const app = express()

//Config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app)
initWebRoutes(app)

let port = process.env.PORT || 6969 //Neu ko ton tai thi se la 6969



app.listen(port,()=>{
    console.log("Backend nodejs is running on PORT: "+ port)
})
