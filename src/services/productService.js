import Product from '../models/Product'

let getProductByCategory = (category)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await Product.findProductsByCategory(category)
            let products = data[0]
            if (Array.isArray(products) && products.length){
                resolve(products)
            }
            else resolve([])
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProductByCategory: getProductByCategory
}