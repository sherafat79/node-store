const { ApiRoutes } = require("./api");
const { authRoutes } = require("./user/auth");

const router =require("express").Router();
router.use("/user",authRoutes);
router.use("/",ApiRoutes);

module.exports={
    AllRoutes:router
}