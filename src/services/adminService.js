const bcrypt = require('bcrypt');
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


module.exports = {loginAdmin,checkExistUserName,checkPassWord}