import User from '../models/User'
const bcrypt = require('bcrypt');
import db from '../ulti/db'

let checkUserNameExist =  (userName)=>{

    return new Promise(async (resolve,reject)=>{
        try {
            let data = await User.checkUserNameExist(userName)
            let user = data[0]
            //console.log('trong ham check',user)
            
            if (Array.isArray(user) && user.length){
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
            let data = await User.checkUserNameExist(userName)
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

let saveOrder = (order)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let data = 
            await db.execute(
                "insert into `order` (orderID,cid,status,total,createdAt,phone,address,delivery)values (?,?,?,?,?,?,?,?)",
                [order.orderId,order.cid,order.status,order.total,new Date(),order.phone,order.address,order.delivery])
            //console.log('OKE')
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    checkUserNameExist: checkUserNameExist,
    checkPassWord: checkPassWord,
    saveOrder: saveOrder
}