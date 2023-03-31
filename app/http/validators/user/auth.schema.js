const joi=require("joi");
const createHttpError = require("http-errors");
const getOtpSchema = joi.object({
    mobile : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمی باشد"))
});
const checkOtpSchema = joi.object({
    mobile : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest("شماره موبایل وارد شده صحیح نمی باشد")),
    code:joi.string().min(4).max(6).error(createHttpError.BadRequest("فرمت کد ارسالی صحیح نیست !"))
});
module.exports={
    getOtpSchema,
    checkOtpSchema 
}