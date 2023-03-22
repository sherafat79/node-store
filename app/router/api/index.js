const homeController = require("../../http/controllers/api/home.controller");

const router =require("express").Router();
router.get("/",homeController.index)
module.exports={
    ApiRoutes:router
}