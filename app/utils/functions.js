const JWT=require("jsonwebtoken")
const { UserModel } = require("../models/User")
const { ACCESS_TOKEN_SECRET_KEY } = require("./constant")
const createHttpError = require("http-errors")
function randomNumber(){
    return Math.floor((Math.random()*90000)+10000)
}
function deleteUnknownData(obj){
    const newObj={...obj}
    Object.keys(newObj).forEach(key=>{
        if([""," ",0,null,"0",NaN].includes(newObj[key])) delete newObj[key]
    })
    return newObj
}
function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1d"
        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطایی در سمت سرور رخ داده است"));
            resolve(token)
        })
    })
}
module.exports={
    randomNumber,deleteUnknownData,SignAccessToken
}