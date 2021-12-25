
import db from '../ulti/db'

module.exports = class User{
    constructor (userName,passWord,roleId,phone,address,firstName,lastName){
        this.userName = userName
        this.passWord=passWord
        this.roleId = roleId
        this.phone = phone
        this.address = address
        this.firstName = firstName
        this.lastName = lastName
    }

    static findAll(){
        return db.execute('SELECT * from user')
    }
    
    
}