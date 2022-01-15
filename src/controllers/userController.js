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

let handleSaveOrder =  async (req,res)=>{
    try {
        //console.log(req.body)
        let order = {
            orderId: req.body.orderId,
            cid: req.body.cid,
            status: req.body.status,
            total: req.body.total,
            phone: req.body.phone,
            address: req.body.address,
            delivery: req.body.delivery
        }
        await userService.saveOrder(order)
        return res.status(200).json('Success')
    } catch (error) {
        console.log(error)
    }
}


let handleFindOrderByUserId = async (req,res)=>{
    try {
        let id = req.query.id
        let data = await userService.findOrderByUserId(id)
        return res.status(200).json(data[0])
    } catch (error) {
        console.log(error)
    }
}

let handleChangePassWord = async(req,res)=>{
    try {
        let userName = req.body.userName
        let passWord = req.body.passWord
        let rePassWord = req.body.rePassWord
        let data = userService.checkPassWord(userName,passWord)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUser: getAllUser,
    handleUserLogin: handleUserLogin,
    handleSaveOrder: handleSaveOrder,
    handleFindOrderByUserId: handleFindOrderByUserId,
    handleChangePassWord: handleChangePassWord
}