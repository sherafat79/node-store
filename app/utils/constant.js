module.exports = {
  MongoIDPattern : /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
  ROLES : Object.freeze({
      USER : "USER",
      ADMIN : "ADMIN",
      WRITER : "WRITER",
      TEACHER : "TEACHER",
      SUPPLIER : "SUPPLIER"
  }),
  EXPIRES_IN: new Date().getTime() + 120000,
  ACCESS_TOKEN_SECRET_KEY:"5d0e9d6701781d3819b4ede78709a869",
  REFRESH_TOKEN_SECRET_KEY:"cbcca8ee254bb5d7d12d5c80d4356c07",
};
