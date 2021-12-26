import db from "../ulti/db";
import User from '../models/User'



let getAllUser =  async (req,res)=>{
    let  [rows] = await User.findAll()
    console.log(rows)
    return res.status(200).json(rows)
    
}

module.exports = {
    getAllUser: getAllUser
}