import express from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import productController from '../controllers/productController'

let router = express.Router()

let initWebRoutes = (app)=>{
    router.get('/',(req,res)=>{
        return res.send('Hello world')
    })

    router.get('/home',homeController.getHomePage)


    router.get('/add-user',homeController.getAddNewUser)
    router.post('/post-add-user',homeController.postAddNewUser)

    // API
    router.get('/api/all-user',userController.getAllUser)
    router.post('/api/login',userController.handleUserLogin)
    router.get('/api/get-product',productController.handleGetProductByCategory)

    return app.use("/",router)

}

module.exports = initWebRoutes