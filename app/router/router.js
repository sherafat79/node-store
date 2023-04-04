const { ApiRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { authRoutes } = require("./user/auth");

const router =require("express").Router();
router.use("/user",authRoutes);
router.use("/",ApiRoutes);
router.use("/developer",DeveloperRoutes);

module.exports={
    AllRoutes:router
}