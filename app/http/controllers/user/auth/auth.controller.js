const { getOtpSchema } = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");

class AuthController extends Controller{
async login(req,res,next){
    try {
        const result =await getOtpSchema.validateAsync(req.body);
        return res.status(200).json({
            status:200,
            message:"کد با موفقیت ارسال شد"
        })
    } catch (error) {
        next(error)
    }
}

}
module.exports={
    AuthController:new AuthController()
}