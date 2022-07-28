import User from "../models/User";
import db from "../ulti/db";
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

let checkUserNameExist = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await User.checkUserNameExist(userName);
      let user = data[0];
      //console.log('trong ham check',user)

      if (Array.isArray(user) && user.length) {
        resolve(true);
      } else resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

let checkPassWord = (userName, passWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await User.checkUserNameExist(userName);
      let user = data[0];
      //console.log('trong ham check',user)
      let check = bcrypt.compareSync(passWord, user[0].passWord);
      //console.log(check)
      if (check) {
        resolve(user[0]);
      } else resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

let saveOrder = (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "insert into `order` (orderID,cid,status,total,createdAt,phone,address,delivery)values (?,?,?,?,?,?,?,?)",
        [
          order.orderId,
          order.cid,
          order.status,
          order.total,
          new Date(),
          order.phone,
          order.address,
          order.delivery,
        ]
      );
      //console.log('OKE')
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

let findOrderByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select * from `order` where cid = ? order by createdAt ",
        [id]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let saveNewPassWord = (userName, newPassWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = bcrypt.hashSync(newPassWord, salt);
      let data = await db.execute(
        "update user set passWord = ? where userName = ?;",
        [hash, userName]
      );
      resolve(data[0]);
    } catch (error) {
      reject(error);
    }
  });
};

let changeFirstNameLastNameAvatar = (cid, firstName, lastName, ava) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "update `user` set firstName = ? , lastName = ? , image = ? where cid = ? ;",
        [firstName, lastName, ava, cid]
      );
      resolve(data[0]);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInfoByCid = (cid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute("select * from user where cid = ?;", [cid]);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  checkUserNameExist: checkUserNameExist,
  checkPassWord: checkPassWord,
  saveOrder: saveOrder,
  findOrderByUserId: findOrderByUserId,
  saveNewPassWord: saveNewPassWord,
  changeFirstNameLastNameAvatar: changeFirstNameLastNameAvatar,
  getUserInfoByCid: getUserInfoByCid,
};
