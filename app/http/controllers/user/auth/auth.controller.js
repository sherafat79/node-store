const createHttpError = require("http-errors");
const { UserModel } = require("../../../../models/User");
const { USER_ROLE, EXPIRES_IN } = require("../../../../utils/constant");
const {
  randomNumber,
  deleteUnknownData,
  SignAccessToken,
} = require("../../../../utils/functions");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const Controller = require("../../controller");

class AuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumber();
      const saveResult = this.saveUser(code, mobile);
      if (saveResult)
        return res.status(200).json({
          status: 200,
          message: "کد با موفقیت ارسال شد",
          data: {
            mobile,
            code,
          },
        });
      throw createHttpError.Unauthorized("ورود ناموفق");
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createHttpError.NotFound("کاربری یافت نشد");
      if (code != user.otp.code)
        throw createHttpError.Unauthorized("کد ارسالی اشتباه است ");
      if (+Date.now() > user.otp.expiresIn)
        throw createHttpError.Unauthorized("کد ارسالی منقضی شده است");
      const accessToken = await SignAccessToken(user._id);
      return res.status(200).json({
        data: {
          code: accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async saveUser(code, mobile) {
    const isUserExists = await this.checkUserExists(mobile);
    const otp = {
      code,
      expiresIn: EXPIRES_IN,
    };
    if (isUserExists) return await this.updateUser(mobile, {otp});
    return !!(await UserModel.create({
      mobile,
      Role: [USER_ROLE],
      otp,
    }));
  }
  async checkUserExists(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  async updateUser(mobile, data = {}) {
    const userData = deleteUnknownData(data);
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: userData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = {
  AuthController: new AuthController(),
};
