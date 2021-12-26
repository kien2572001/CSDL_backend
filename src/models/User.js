
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

    addNewUser(){
        return db.execute('INSERT INTO user (userName,passWord,roleId,phone,address,firstName,lastName,createdAT,updatedAt) values (?,?,?,?,?,?,?,?,?)',[this.userName,this.passWord,this.roleId,this.phone,this.address,this.firstName,this.lastName,new Date(),new Date()])
    }

    static findAll(){
        return db.execute('SELECT * from user')
    }
    
    
}