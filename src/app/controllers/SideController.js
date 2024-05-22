const Request = require("../models/Request");
const Account = require("../models/Account");
class SideController {
  //[GET] /home or /
  async index(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        res.render("home", {
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /about
  about(req, res, next) {
    res.render("about", {
      account: req.session.account,
      logged: req.session.isLoggedIn,
    });
  }
  //[GET] /request
  async request(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        const requestInfo = await Request.getRequestIsRead(0);
        const requestInfoUltra = await Request.GetRequestByIdNguoiGuiOrNhan(
          "MaTaiKhoanGui",
          0
        );
        res.render("../../resources/user/request.hbs", {
          requestInfo: requestInfo,
          requestInfoUltra: requestInfoUltra,
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /request/was-read
  async requestWasRead(req, res) {
    try {
      if (!req.session.isLoggedIn) {
        return res.redirect("login");
      } else {
        const requestInfo = await Request.getRequestIsRead(1);
        const requestInfoUltra = await Request.GetRequestByIdNguoiGuiOrNhan(
          "MaTaiKhoanGui",
          1
        );
        res.render("../../resources/admin/request_was_read.hbs", {
          requestInfo: requestInfo,
          requestInfoUltra: requestInfoUltra,
          account: req.session.account,
          logged: req.session.isLoggedIn,
        });
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[POST] /request
  async createRequest(req, res) {
    try {
      const {TieuDe, NoiDung} = req.body;
      await Request.addNewData(
        TieuDe,
        NoiDung,
        req.session.account.MaTaiKhoan,
        "01ADxyz",
        0
      );
      res.redirect("back");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  //[GET] /request/:id/Content
  async requestContent(req, res) {
    try {
      const idRequest = req.query.idRequest;
      const requestInfoSuperUltra = await Request.GetOuterDataTableYeuCau(
        idRequest
      );
      let wasRead = 1;
      await Request.requestWasRead(idRequest, wasRead);
      res.render("../../resources/admin/read_request.hbs", {
        requestInfoSuperUltra: requestInfoSuperUltra,
        account: req.session.account,
        logged: req.session.isLoggedIn,
      });
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  async forgetPass(req, res) {
    try {
      res.render("forget");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  async CheckPhoneNumber(req, res) {
    try {
      const {phone} = req.body;
      let dontFound = false;
      const accountinfo = await Account.getAll();
      for (let i = 0; i < accountinfo.length; i++) {
        let Element = accountinfo[i];
        if (Element.SoDienThoai === phone) {
          const accountPhone = await Account.GetDataWithPhone(
            Element.SoDienThoai
          );
          if(accountPhone){
            res.render("../../resources/views/getpass.hbs", {
              account: accountPhone,
            });
          }
          dontFound = true;
          break;
        }
      }
      if(!dontFound){
        res.redirect("back");
      }
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
  async GetPass(req, res) {
    try {
      const {password, id} = req.body;
      await Account.UpdatePassAccount(password, id);
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({message: `Internal server error + ${error}`});
    }
  }
}

module.exports = new SideController();
