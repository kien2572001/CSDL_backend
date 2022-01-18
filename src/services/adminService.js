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

module.exports = {loginAdmin,checkExistUserName,checkPassWord,getOrderBySid,getOrderItemBySidAndOrderId,changeOrderStatus,getProductBySid}