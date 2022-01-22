import express, { Router } from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import productController from '../controllers/productController'
import adminController from '../controllers/adminController'
const fileUploader = require('../config/cloudinary.config');
let router = express.Router()

let initWebRoutes = (app)=>{
    router.get('/',(req,res)=>{
        return res.send('Hello world')
    })

    router.get('/home',homeController.getHomePage)


    router.get('/add-user',homeController.getAddNewUser)
    router.post('/post-add-user',homeController.postAddNewUser)

    // API
    //upload anh
    router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
        if (!req.file) {
          next(new Error('No file uploaded!'));
          return;
        }
        //const newImage  = new UploadedFile({title: req.file.filename, fileUrl: req.file.path})
        return  res.json({ secure_url: req.file.path })
        // newImage.save((err) => {
        //   if (err) {
        //     return res.status(500)
        //   }
        //    return  res.json({ secure_url: req.file.path })
        // })
      });

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

    //user
    router.post('/api/change-password',userController.handleChangePassWord)
    router.post('/api/change-fla',userController.handleChangeFirstNameLastNameAvatar)
    router.get('/api/get-userinfo-by-cid',userController.handleGetUserInfoByCid)

    //admin
    router.post('/api/admin/login',adminController.handleAdminLogin)
    router.get('/api/admin/get-order-by-sid',adminController.handleGetOrderBySid)
    router.get('/api/get-order-item-by-sid-orderid',adminController.handleGetOrderItemBySidAndOrderId)
    router.post('/api/change-order-status',adminController.handleChangeOrderStatus)
    router.get('/api/get-product-by-sid',adminController.handleGetProductBySid)
    router.post('/api/add-new-product-by-store',adminController.handleAddNewProductByStore)
    router.get('/api/get-next-pid',adminController.handleGetNextPid)
    router.post('/api/add-product-category',adminController.handleAddProductCategory)
    router.post('/api/update-product-by-store',adminController.handleUpdateProductByStore)
    router.post('/api/search-by-filter',adminController.handleSearchByFilter)
    router.get('/api/total30day',adminController.handleTotal30day)
    router.get('/api/handleOrder30day',adminController.handleOrder30day)
    router.get('/api/totalrevenue',adminController.handleTotalRevenue)

    //product
    router.get('/api/get-product-by-storeId',productController.handleGetProductByStoreId)
    router.post('/api/delete-product-by-pid',productController.handleDeleteProductById)

    //category
    router.get('/api/get-all-category',productController.handleGetAllCategory)

    return app.use("/",router)

}

module.exports = initWebRoutes