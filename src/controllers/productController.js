import db from "../ulti/db";
import productService from '../services/productService'

let handleGetProductByCategory = async (req,res)=>{
    try {
        console.log(req.query)
        let products = await productService.getProductByCategory(req.query.category)
        //console.log(products)
        return res.status(200).json({
            products: products
        })
    } catch (error) {
        console.log(error)
    }
}

let handleGetCategoryById = async (req,res)=>{
    try {
        let category = await productService.getCategoryById(req.query.id)
        return res.status(200).json({
            category: category
        })
    } catch (error) {
        console.log(error)
    }
}

let handleGetStoreById = async (req,res)=>{
    try {
        let store = await productService.getStoreById(req.query.id)
        return res.status(200).json({
            store: store
        })
    } catch (error) {
        console.log(error)
    }
}

let handleSaveToOrderItem = async (req,res)=>{
    try {
        let item = {
            orderId: req.body.orderId,
            pid: req.body.pid,
            price: req.body.price,
            quantity: req.body.quantity
        }
        //console.log(item)
        let data = await productService.saveToOrderItem(item)
        return res.status(200).json('OK')
    } catch (error) {
        console.log(error)
    }
}

let handleFindOrderById = async(req,res)=>{
    try {
        let id = req.query.id
        let data = await productService.findOrderById(id)
        //console.log(data[0])
        return res.status(200).json(data[0])
    } catch (error) {
        console.log(error)
    }
}

let handleFindProductById = async (req,res)=>{
    let id = req.query.id
    try {
        let data = await productService.findProductById(id)
        return res.status(200).json(data[0])
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleGetProductByCategory: handleGetProductByCategory,
    handleGetCategoryById: handleGetCategoryById,
    handleGetStoreById: handleGetStoreById,
    handleSaveToOrderItem: handleSaveToOrderItem,
    handleFindOrderById: handleFindOrderById,
    handleFindProductById: handleFindProductById,
}