const homeController = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middleware/verifyAccessToken");

const router =require("express").Router();
/**
 * @swagger
 * tags:
 *   name: indexRoutes
 *   description: The index data API
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [indexRoutes]
 *      parameters:
 *          -   in: header
 *              name: refreshToken
 *              example: Bearer Token
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */
router.get("/",verifyAccessToken,homeController.index)
module.exports={
    ApiRoutes:router
}