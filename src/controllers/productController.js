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

module.exports = {
    handleGetProductByCategory: handleGetProductByCategory,
    handleGetCategoryById: handleGetCategoryById,
    handleGetStoreById: handleGetStoreById
}