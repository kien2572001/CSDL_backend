import Product from '../models/Product'
import db from '../ulti/db'

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

let saveToOrderItem = async (item)=>{
    return new Promise (async (resolve,reject)=>{
        try {
            let data = await db.execute(`insert into order_item  (orderId,pid,price,quantity)
                values (?,?,?,?);`,[item.orderId,item.pid,item.price,item.quantity])
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })

}

let findOrderById = (id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await db.execute('select  DISTINCT * from `order`inner join order_item on `order`.orderId = order_item.orderId where `order`.orderId = "' +id  + '";')
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}


let findProductById = (id)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute('select * from product where pid = ?;',[id])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let findProductByStoreId = (storeId)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await db.execute('select * from product where sid = ? ;',[storeId])
            resolve(data[0])
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProductByCategory: getProductByCategory,
    getCategoryById: getCategoryById,
    getStoreById: getStoreById,
    saveToOrderItem: saveToOrderItem,
    findOrderById: findOrderById,
    findProductById: findProductById,
    findProductByStoreId: findProductByStoreId
}