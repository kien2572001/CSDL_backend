import express from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'

let router = express.Router()

let initWebRoutes = (app)=>{
    router.get('/',(req,res)=>{
        return res.send('Hello world')
    })

    router.get('/home',homeController.getHomePage)


    router.get('/add-user',homeController.getAddNewUser)
    router.post('/post-add-user',homeController.postAddNewUser)

    router.get('/api/all-user',userController.getAllUser)

    return app.use("/",router)

}

module.exports = initWebRoutes