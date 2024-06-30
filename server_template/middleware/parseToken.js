const vertoken = require("../utils/token");

/**
 * @desc 用于解析用户token的中间件
 * */
const parseToken = function (req, res, next) {
  const token = req.headers['authorization'];
  if (token === undefined) {
    return next();
  } else {
    vertoken.getToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
}

module.exports = parseToken
