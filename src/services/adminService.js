const bcrypt = require('bcrypt');
import { reject } from 'bcrypt/promises';
import db from '../ulti/db'

let checkExistUserName = (userName)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await db.execute('select * from store where userName = ?;',[userName])
            //console.log(data[0])
            if (Array.isArray(data[0]) && data[0].length){
                resolve(true)
            }
            else resolve(false)
        } catch (error) {
            reject(error)
        }
    })
}

let checkPassWord = (userName,passWord)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await db.execute('select * from store where userName = ?;',[userName])
            let user = data[0]
            //console.log('trong ham check',user)
            let check = bcrypt.compareSync(passWord,user[0].passWord)
            //console.log(check)
            if (check){
                resolve(user[0])
            }
            else resolve(null)
        } catch (error) {
            reject(error)
        }
    })
}

let loginAdmin = (userName, passWord)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await db.execute('select * from store where userName = ? and passWord = ?;',[userName,passWord])
            if (Array.isArray(data[0]) && data[0].length){
                resolve(data[0])
            }
            else resolve(null)
        } catch (error) {
            reject(error)
        }
    })
}


let getOrderBySid =  (sid)=>{
    return new Promise (async (resolve,reject)=>{
        try {
            let data = await db.execute('select * from `order` where orderId in (select distinct  `order`.orderId from `order` inner join  order_item on `order`.orderId = order_item.orderId inner join product on order_item.pid = product.pid where sid = ? );',[sid])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}


let getOrderItemBySidAndOrderId = (orderId,sid)=>{
    return new Promise (async (resolve,reject)=>{
        try {
            let data = await db.execute("select  `order`.orderId,order_item.price,order_item.quantity,order_item.pid,product.title,product.img from `order` inner join  order_item on `order`.orderId = order_item.orderId inner join product on order_item.pid = product.pid where sid = ? and `order`.orderId =  ?;",[sid,orderId])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let changeOrderStatus = (orderId,status)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute('update `order` set status = ? where orderId = ?;',[status,orderId])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}


let getProductBySid = (sid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute('select * from product where sid = ?;',[sid])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let addNewProductByStore = (title,content,price,discount,quantity,unit,img,sid)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = await db.execute('insert into product (title,price,quantity,sid,createdAt,updatedAt,discount,img,content,unit) values (?,?,?,?,NOW(),NOW(),?,?,?,?);',[title,price,quantity,sid,discount,img,content,unit])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getNextPid = ()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // let data = await db.execute(`SELECT AUTO_INCREMENT 
            // FROM information_schema.tables
            // WHERE table_name = 'product'
            // and table_schema = 'shop';`)

            let data = await db.execute(`SHOW TABLE STATUS LIKE 'product';`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let addProductCategory = (pid,categoryId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute('insert into product_category (pid,categoryId) values (?,?);',[pid,categoryId])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let updateProductByStore = (title,content,price,discount,quantity,unit,img,pid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute(`update product
                set title = ?,
                content = ?,
                price = ?,
                discount = ?,
                quantity = ?,
                unit = ?,
                img = ?,
                updatedAt = NOW()
            where pid = ?;`,[title,content,price,discount,quantity,unit,img,pid])
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let searchByFilter  = (name,sid,sortBy,category)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            let tmp = ''
            if (sortBy === 'name') tmp = 'order by product.title;'
            else if (sortBy === 'price') tmp = 'order by product.price;'
            else if (sortBy === 'discount') tmp = 'order by product.discount;'
            else if (sortBy === 'quantity') tmp = 'order by product.quantity;'
            else tmp = ' ;'
            let data
            if (category==='none'){
                data  = await db.execute(`select distinct *, product.title as title from product 
            inner join product_category on product_category.pid = product.pid
            inner join category on category.id = product_category.categoryId
            where sid = ?  and product.title like ? `  +
            tmp,[sid,'%' + name + '%'])
            //Loi lap lai 
            }
            else{
                data  = await db.execute(`select distinct *, product.title as title from product 
            inner join product_category on product_category.pid = product.pid
            inner join category on category.id = product_category.categoryId
            where sid = ? and category.title  = ? and product.title like ? ` +
            tmp,[sid,category,'%' + name + '%'])
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let bestSaler = (sid)=>{
    return new Promise(async(resolve,reject)=>{

    })
}


let  total30day = (sid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = db.execute("select SUM(total) from `order` where status = 'Accepted' and createdAt BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE();")
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let order30day = (sid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute("select COUNT(orderId) from `order` where status = 'Accepted' and createdAt BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE();")
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let totalRevenue = (sid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data = await db.execute("select SUM(total) from `order` where status = 'Accepted';")
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    loginAdmin,
    checkExistUserName,
    checkPassWord,
    getOrderBySid,
    getOrderItemBySidAndOrderId,
    changeOrderStatus,
    getProductBySid,
    addNewProductByStore,
    getNextPid,
    addProductCategory,
    updateProductByStore,
    searchByFilter,
    total30day,
    order30day,
    totalRevenue
}