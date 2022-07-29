const bcrypt = require("bcrypt");
import { reject } from "bcrypt/promises";
import db from "../ulti/db";

let checkExistUserName = (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute("select * from store where userName = ?;", [
        userName,
      ]);
      //console.log(data[0])
      if (Array.isArray(data[0]) && data[0].length) {
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
      let data = await db.execute("select * from store where userName = ?;", [
        userName,
      ]);
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

let loginAdmin = (userName, passWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select * from store where userName = ? and passWord = ?;",
        [userName, passWord]
      );
      if (Array.isArray(data[0]) && data[0].length) {
        resolve(data[0]);
      } else resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

let getOrderBySid = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select * from `order` where orderId in (select distinct  `order`.orderId from `order` inner join  order_item on `order`.orderId = order_item.orderId inner join product on order_item.pid = product.pid where sid = ? );",
        [sid]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getOrderItemBySidAndOrderId = (orderId, sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select  `order`.orderId,order_item.price,order_item.quantity,order_item.pid,product.title,product.img from `order` inner join  order_item on `order`.orderId = order_item.orderId inner join product on order_item.pid = product.pid where sid = ? and `order`.orderId =  ?;",
        [sid, orderId]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let changeOrderStatus = (orderId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "update `order` set status = ? where orderId = ?;",
        [status, orderId]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getProductBySid = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute("select * from product where sid = ?;", [
        sid,
      ]);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let addNewProductByStore = (
  title,
  content,
  price,
  discount,
  quantity,
  unit,
  img,
  sid
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "insert into product (title,price,quantity,sid,createdAt,updatedAt,discount,img,content,unit) values (?,?,?,?,NOW(),NOW(),?,?,?,?);",
        [title, price, quantity, sid, discount, img, content, unit]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getNextPid = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(`SHOW TABLE STATUS LIKE 'product';`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let addProductCategory = (pid, categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "insert into product_category (pid,categoryId) values (?,?);",
        [pid, categoryId]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let updateProductByStore = (
  title,
  content,
  price,
  discount,
  quantity,
  unit,
  img,
  pid
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        `update product
                set title = ?,
                content = ?,
                price = ?,
                discount = ?,
                quantity = ?,
                unit = ?,
                img = ?,
                updatedAt = NOW()
            where pid = ?;`,
        [title, content, price, discount, quantity, unit, img, pid]
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let searchByFilter = (name, sid, sortBy, category) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = "";
      if (sortBy === "name") tmp = "order by product.title;";
      else if (sortBy === "price") tmp = "order by product.price;";
      else if (sortBy === "discount") tmp = "order by product.discount;";
      else if (sortBy === "quantity") tmp = "order by product.quantity;";
      else tmp = " ;";
      let data;
      if (category === "none") {
        data = await db.execute(
          `select distinct  *, product.title as title from product 
            inner join product_category on product_category.pid = product.pid
            inner join category on category.id = product_category.categoryId
            where sid = ?  and product.title like ? ` + tmp,
          [sid, "%" + name + "%"]
        );
        //Loi lap lai
      } else {
        data = await db.execute(
          `select distinct *, product.title as title from product 
            inner join product_category on product_category.pid = product.pid
            inner join category on category.id = product_category.categoryId
            where sid = ? and category.title  = ? and product.title like ? ` +
            tmp,
          [sid, category, "%" + name + "%"]
        );
      }

      //Xu li lap
      let output = [];
      let arr = data[0];
      for (let i = 0; i < arr.length; i++) {
        let check = false;
        check = output.find((item) => {
          if (item.pid === arr[i].pid) {
            return true;
          }
        });
        if (!check) {
          output.push(arr[i]);
        }
      }
      resolve([output, data[1]]);
    } catch (error) {
      reject(error);
    }
  });
};

let bestSaler = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select *,SUM(order_item.quantity) as sold from `order` INNER JOIN order_item ON order_item.orderId = `order`.orderId WHERE `order`.`status`='Accepted' GROUP BY order_item.pid order by sold DESC limit 5;"
      );
      let output = [];
      let rank = data[0];
      let p0 = await db.execute("select * from product where pid = ?;", [
        rank[0].pid,
      ]);
      let p1 = await db.execute("select * from product where pid = ?;", [
        rank[1].pid,
      ]);
      let p2 = await db.execute("select * from product where pid = ?;", [
        rank[2].pid,
      ]);
      let p3 = await db.execute("select * from product where pid = ?;", [
        rank[3].pid,
      ]);
      let p4 = await db.execute("select * from product where pid = ?;", [
        rank[4].pid,
      ]);
      output = [p0[0][0], p1[0][0], p2[0][0], p3[0][0], p4[0][0]];
      resolve([data[0], output]);
    } catch (error) {
      reject(error);
    }
  });
};

let total30day = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = db.execute(
        "select SUM(total) from `order` where status = 'Accepted' and createdAt BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE();"
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let order30day = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select COUNT(orderId) from `order` where status = 'Accepted' and createdAt BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE();"
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let totalRevenue = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.execute(
        "select SUM(total) from `order` where status = 'Accepted';"
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

let getChartData = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.execute(
        "select * from `order` inner join order_item on order_item.orderId = `order`.orderId where `order`.status = 'Accepted' ;",
        [sid]
      );
      let newCustomers = await db.execute("select cid,createdAt from user");
      let orders = await db.execute(
        "select orderId,createdAt,total from `order` where status = 'Accepted'"
      );

      resolve([products[0], newCustomers[0], orders[0]]);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  loginAdmin,
  checkExistUserName,
  checkPassWord,
  getOrderBySid,
  getOrderItemBySidAndOrderId,
  changeOrderStatus,
  getProductBySid,
  addNewProductByStore,
  getNextPid,
  addProductCategory,
  updateProductByStore,
  searchByFilter,
  total30day,
  order30day,
  totalRevenue,
  getChartData,
  bestSaler,
};
