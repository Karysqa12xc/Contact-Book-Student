
class AdminController{
    //[GET] /admin/create_account
    create_account_view(req, res, next){
        if(!req.session.isLoggedIn){
            res.redirect("/")
        }else{

        }
        res.render("../../resources/admin/create_account", {account: req.session.account, logged: req.session.isLoggedIn});
    }
    //[POST] /admin/create_account
    create_account_post(req, res, next){

    }
}
module.exports = new AdminController();