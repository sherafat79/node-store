const Jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constant");
const createHttpError = require("http-errors");
const { UserModel } = require("../../models/User");

function verifyAccessToken(req, res, next) {
  try {
    const headers = req.headers;
    const [bearer, token] = headers?.accesstoken?.split(" ") || [];
    const unAuthorizedError = createHttpError.Unauthorized(
      "لطفا دوباره به حساب کاربری خود وارد شوید"
    );
    if (token && bearer.toLowerCase() === "bearer") {
      Jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
        if (err) throw next(unAuthorizedError);
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0, bills: 0 }
        );
        if (!user) throw next(unAuthorizedError);
        req.user = user;
      });
    }
    return next();
  } catch (error) {
    return next(unAuthorizedError);
  }
}

module.exports = {
  verifyAccessToken,
};
