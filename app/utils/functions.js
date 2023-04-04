const JWT=require("jsonwebtoken")
const { UserModel } = require("../models/User")
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constant")
const createHttpError = require("http-errors")
const redisClient = require("./init_redis")
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
function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: "1y"
        };
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options,async (err, token) => {
            if (err) reject(createHttpError.InternalServerError("خطایی در سمت سرور رخ داده است"));
            await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token);
            resolve(token)
        })
    })
}
function verifyRefreshToken(token) {
    const unAuthorizedError = createHttpError.Unauthorized(
        "لطفا دوباره به حساب کاربری خود وارد شوید"
      );
        return new Promise((resolve,reject)=>{
            JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
                if (err) reject(unAuthorizedError);
                const { mobile } = payload || {};
                const user = await UserModel.findOne(
                  { mobile },
                  { password: 0, otp: 0, bills: 0 }
                );
                if (!user) reject(unAuthorizedError);
                const refreshToken = await redisClient.get(String(user?._id));
                if(refreshToken===token)
                resolve(user)
                else
                reject(unAuthorizedError)
              });
        })
  }
module.exports={
    randomNumber,deleteUnknownData,SignAccessToken,SignRefreshToken,verifyRefreshToken
}