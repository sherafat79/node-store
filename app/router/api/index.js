const homeController = require("../../http/controllers/api/home.controller");

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
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: notfound
 */
router.get("/",homeController.index)
module.exports={
    ApiRoutes:router
}