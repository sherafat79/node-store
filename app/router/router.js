const { ApiRoutes } = require("./api");

const router =require("express").Router();
router.use("/",ApiRoutes);
module.exports={
    AllRoutes:router
}