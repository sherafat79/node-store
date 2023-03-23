const {
  AuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
router.post("/login", AuthController.login);
module.exports = {
  authRoutes: router,
};
