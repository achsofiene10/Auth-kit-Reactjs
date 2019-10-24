const express=require("express");
const route = express.Router();
const controller = require('./controller');
const checkAuth=require("./middlewares/check-auth")



route.post("/adduser",checkAuth,controller.adduser);
route.post("/:iduser/update",checkAuth,controller.Updateuser); // this route is protected with auth
route.get("/Allusers",checkAuth,controller.getAll);
route.post("/login", controller.login);

module.exports=route;