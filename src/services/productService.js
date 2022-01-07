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

let getCategoryById = (id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await Product.findCategoryById(id)
            let category = data[0]
            if (Array.isArray(category) && category.length){
                resolve(category)
            }
            else resolve([])
        } catch (error) {
            reject(error)
        }
    })
}

let getStoreById = (id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await Product.findStoreById(id)
            let stores = data[0]
            if (Array.isArray(stores) && stores.length){
                resolve(stores[0])
            }
            else resolve(null)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProductByCategory: getProductByCategory,
    getCategoryById: getCategoryById,
    getStoreById: getStoreById
}