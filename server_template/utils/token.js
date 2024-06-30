const jwt = require('jsonwebtoken')
const jwtScrect = 'todo_project'

const setToken = function (userId, userName) {
  return new Promise((resolve, reject) => {
    // expiresIn 设置token过期的时间
    // { user_name: user_name, user_id: user_id } 传入需要解析的值（ 一般为用户名，用户id 等）
    const token = jwt.sign({user_id: userId, user_name: userName}, jwtScrect, {expiresIn: '24h'});
    resolve(token)
  })
}

//各个接口需要验证token的方法
const getToken = function (token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({
        error: 'token 是空的'
      })
    } else {
      //第二种  改版后的
      const info = jwt.verify(token.split(' ')[1], jwtScrect);
      resolve(info);  //解析返回的值（sign 传入的值）
    }
  })
}

module.exports = {
  setToken,
  getToken
}
