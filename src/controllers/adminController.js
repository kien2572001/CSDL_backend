import adminService from "../services/adminService";
const bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

let handleAdminLogin = async (req, res) => {
  try {
    let userName = req.body.userName;
    let passWord = req.body.passWord;
    if (!userName || !passWord) {
      return res.status(200).json({
        err: 1,
        message: "Missing parameters",
      });
    }
    let check = await adminService.checkExistUserName(userName);
    if (check === true) {
      let admin = await adminService.checkPassWord(userName, passWord);
      if (admin === null) {
        return res.status(200).json({
          err: 3,
          message: "Wrong password",
          admin: admin,
        });
      } else {
        return res.status(200).json({
          err: 4,
          message: "Login sucess",
          admin: admin,
        });
      }
    } else {
      return res.status(200).json({
        err: 2,
        message: "Username doesn't exist",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

let handleGetOrderBySid = async (req, res) => {
  try {
    let data = await adminService.getOrderBySid(req.query.sid);
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleGetOrderItemBySidAndOrderId = async (req, res) => {
  try {
    let data = await adminService.getOrderItemBySidAndOrderId(
      req.query.orderId,
      req.query.sid
    );
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleChangeOrderStatus = async (req, res) => {
  try {
    console.log(req.body);
    let data = await adminService.changeOrderStatus(
      req.body.orderId,
      req.body.status
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

let handleGetProductBySid = async (req, res) => {
  try {
    let sid = req.query.sid;
    let data = await adminService.getProductBySid(sid);
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleAddNewProductByStore = async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    let price = req.body.price;
    let discount = req.body.discount;
    let quantity = req.body.quantity;
    let unit = req.body.unit;
    let img = req.body.img;
    let sid = req.body.sid;
    let data = await adminService.addNewProductByStore(
      title,
      content,
      price,
      discount,
      quantity,
      unit,
      img,
      sid
    );
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleGetNextPid = async (req, res) => {
  try {
    let data = await adminService.getNextPid();
    //console.log(data)
    return res.status(200).json(data[0][0]);
  } catch (error) {
    console.log(error);
  }
};

let handleAddProductCategory = async (req, res) => {
  try {
    console.log(req.body);
    let data = await adminService.addProductCategory(
      req.body.pid,
      req.body.categoryId
    );
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleUpdateProductByStore = async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    let price = req.body.price;
    let discount = req.body.discount;
    let quantity = req.body.quantity;
    let unit = req.body.unit;
    let img = req.body.img;
    let pid = req.body.pid;
    let data = await adminService.updateProductByStore(
      title,
      content,
      price,
      discount,
      quantity,
      unit,
      img,
      pid
    );
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleSearchByFilter = async (req, res) => {
  try {
    let name = req.body.name;
    let sid = req.body.sid;
    let sortBy = req.body.sortBy;
    let category = req.body.category;
    let data = await adminService.searchByFilter(name, sid, sortBy, category);
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
  }
};

let handleTotal30day = async (req, res) => {
  try {
    let sid = req.body.sid;
    let data = await adminService.total30day(sid);
    return res.status(200).json(data[0][0]);
  } catch (error) {
    console.log(error);
  }
};

let handleOrder30day = async (req, res) => {
  try {
    let sid = req.body.sid;
    let data = await adminService.order30day(sid);
    return res.status(200).json(data[0][0]);
  } catch (error) {
    console.log(error);
  }
};

let handleTotalRevenue = async (req, res) => {
  try {
    let sid = req.body.sid;
    let data = await adminService.totalRevenue(sid);
    return res.status(200).json(data[0][0]);
  } catch (error) {
    console.log(error);
  }
};

let handleGetChartData = async (req, res) => {
  try {
    let sid = req.query.sid;
    let data = await adminService.getChartData(sid);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

let handleBestSaler = async (req, res) => {
  try {
    let sid = req.query.sid;
    let data = await adminService.bestSaler(sid);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleAdminLogin,
  handleGetOrderBySid,
  handleGetOrderItemBySidAndOrderId,
  handleChangeOrderStatus,
  handleGetProductBySid,
  handleAddNewProductByStore,
  handleGetNextPid,
  handleAddProductCategory,
  handleUpdateProductByStore,
  handleSearchByFilter,
  handleTotal30day,
  handleOrder30day,
  handleTotalRevenue,
  handleGetChartData,
  handleBestSaler,
};
