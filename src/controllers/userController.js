import db from "../ulti/db";
import User from '../models/User'
import userService from '../services/userService'



let getAllUser =  async (req,res)=>{
    User.findAll()
        .then((data)=>{
            // console.log(data[0])
            return res.status(200).json(data[0])
        })
        .catch(e=>{
            console.log(e)
        })

    
    
}

let handleUserLogin = async (req,res)=>{
    try {
        let userName = req.body.userName
        let passWord = req.body.passWord
        //Check co null userName passWord
        if (!userName||!passWord){
            return res.status(500).json({
                errCode: 3,
                errMessage: 'Missing input parameters'
            })
        }
        let isExist = await userService.checkUserNameExist(userName)

        if (isExist===false){
            return res.status(200).json({
                errCode: 2,
                errMessage: `Username doesn't exist`
            })
        }

        let data = await userService.checkPassWord(userName,passWord)
        if (data){
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Success',
                user: data
            })
        }
        else {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Wrong password'
            })
        }

    } catch (error) {
        console.log(error)
    }
    
}



module.exports = {
    getAllUser: getAllUser,
    handleUserLogin: handleUserLogin
}