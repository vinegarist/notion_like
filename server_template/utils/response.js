/**
 * @desc 封装一个全局的返回响应结果的函数
 * */
const resHandler = (code, msg, data = null) => {
  return {
    code,
    msg,
    data
  }
}

module.exports = resHandler
