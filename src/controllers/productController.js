import db from "../ulti/db";
import productService from '../services/productService'

let handleGetProductByCategory = async (req,res)=>{
    try {
        //console.log(req.query)
        let products = await productService.getProductByCategory(req.query.category)
        //console.log(products)
        return res.status(200).json({
            products: products
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleGetProductByCategory: handleGetProductByCategory
}