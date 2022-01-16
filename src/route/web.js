import express from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import adminController from '../controllers/adminController'

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
    router.get('/api/get-category-by-id',productController.handleGetCategoryById)
    router.get('/api/get-store-by-id',productController.handleGetStoreById)
    router.post('/api/save-order',userController.handleSaveOrder)
    router.post('/api/save-to-order-item',productController.handleSaveToOrderItem)
    router.get('/api/find-order-by-id',productController.handleFindOrderById)
    router.get('/api/find-product-by-id',productController.handleFindProductById)
    router.get('/api/find-order-by-userid',userController.handleFindOrderByUserId)
    router.get('/api/change-password',userController.handleChangePassWord)

    //admin
    router.post('/api/admin/login',adminController.handleAdminLogin)

    //product
    router.get('/api/get-product-by-storeId',productController.handleGetProductByStoreId)

    return app.use("/",router)

}

module.exports = initWebRoutes