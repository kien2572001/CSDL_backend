import User from '../models/User'

let getHomePage = (req,res)=>{
    return res.render('homepage',{})
}

let getAddNewUser  = (req,res)=>{
    res.render('add-user',{})
}

let postAddNewUser = (req,res)=>{
    let data = req.body
    console.log(data)
    let user = new User(data.email,data.passWord,Number.parseInt(data.roleId) ,data.phoneNumber,data.address,data.firstName,data.lastName)
    console.log(user)
    user.addNewUser()
        .then(temp=>{
            console.log(temp)
            return res.render('add-user',{})
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