const {
  AuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: auth-Routes
 *   description: user auth routes
 * /user/get-otp:
 *    post:
 *      summary: send otp code  to user phone number 
 *      tags: [auth-Routes]
 *      description: otp login
 *      parameters:
 *      -   name: mobile
 *          description: fa-IRI phoneNumber
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: success
 *        400:
 *           description: Bad Request
 *        401:
 *           description: unAuthorization
 *        500: 
 *           description: internal server error
 * 
 */
router.post("/get-otp", AuthController.getOtp);
/**
 * @swagger
 * /user/check-otp:
 *    post:
 *      summary: check otp code  with user phone number is true or not
 *      tags: [auth-Routes]
 *      description: otp check
 *      parameters:
 *      -   name: mobile
 *          description: fa-IRI phoneNumber
 *          in: formData
 *          required: true
 *          type: string
 *      -   name: code
 *          description: enter reserved code 
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        201:
 *          description: success
 *        400:
 *           description: Bad Request
 *        401:
 *           description: unAuthorization
 *        404:
 *           description: not found
 *        500: 
 *           description: internal server error
 * 
 */
router.post("/check-otp", AuthController.checkOtp);
module.exports = {
  authRoutes: router,
};
