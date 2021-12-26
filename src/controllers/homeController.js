import User from '../models/User'
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10)
//Render 1 so page phia server de quan li tai khoan thoi

let getHomePage = (req,res)=>{
    return res.render('homepage',{})
}

let getAddNewUser  = (req,res)=>{
    res.render('add-user',{})
}

let postAddNewUser = async (req,res)=>{
    let data = req.body
    console.log(data)
    let hashPassWord = await bcrypt.hashSync(data.passWord,salt)
    let user = new User(data.email,hashPassWord,Number.parseInt(data.roleId) ,data.phoneNumber,data.address,data.firstName,data.lastName)
    //console.log(user)
    user.addNewUser()
        .then(temp=>{
            //console.log(temp)
            return res.render('homepage',{})
        })
        .catch(err=>{
            console.log(err)
        })
}

module.exports = {
    getHomePage: getHomePage,
    getAddNewUser: getAddNewUser,
    postAddNewUser: postAddNewUser,
}