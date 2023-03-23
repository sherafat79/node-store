const joi=require("joi");
const createHttpError = require("http-errors");
const getOtpSchema = joi.object({
    mobile : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمی باشد"))
});
module.exports={
    getOtpSchema
}