import adminService from '../services/adminService'
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10)



let handleAdminLogin = async (req,res)=>{
    try {
        let userName = req.body.userName
        let passWord = req.body.passWord
        if (!userName||!passWord){
            return res.status(200).json({
                err: 1,
                message: 'Missing parameters'
            })
        }
        let check = await adminService.checkExistUserName(userName)
        if (check===true){
            let admin  = await adminService.checkPassWord(userName,passWord)
            if (admin === null){
                return res.status(200).json({
                    err: 3,
                    message: "Wrong password",
                    admin: admin
                })
            }
            else{
                return res.status(200).json({
                    err: 4,
                    message: "Login sucess",
                    admin: admin
                })
            }
            
        }
        else{
            return res.status(200).json({
                err: 2,
                message: "Username doesn't exist",
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

let handleGetOrderBySid = async (req,res)=>{
    try {
        let data = await adminService.getOrderBySid(req.query.sid)
        return res.status(200).json(data[0])
    } catch (error) {
        console.log(error)
    }
}   


let handleGetOrderItemBySidAndOrderId = async (req,res)=>{
    try {
        let data = await adminService.getOrderItemBySidAndOrderId(req.query.orderId,req.query.sid)
        return res.status(200).json(data[0])
    } catch (error) {
        console.log(error)
    }
}

let handleChangeOrderStatus  = async (req,res)=>{
    try {
        console.log(req.body)
        let data = await adminService.changeOrderStatus(req.body.orderId,req.body.status)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

let handleGetProductBySid = async (req,res)=>{
    try {
        let sid = req.query.sid
        let data = await adminService.getProductBySid(sid)
        return res.status(200).json(data[0])
    } catch (error) {
        console.log(error)
    }
}

module.exports ={handleAdminLogin,handleGetOrderBySid,handleGetOrderItemBySidAndOrderId,handleChangeOrderStatus,handleGetProductBySid}