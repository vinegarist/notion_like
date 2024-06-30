const resHandler = require("../utils/response");
const randomId = require('../utils/randomId')
const formatData = require('../utils/formatData')
const vertoken = require('../utils/token')
const {
  selectParamsFn,
  selectFn,
  insertParamsFn,
  insertFn,
  deleteParamsFn,
  deleteFn,
  baseQueryFn,
  updateParamsFn,
  updateFn
} = require("../database/mysqlQueryFn");


/** 用户注册接口 业务逻辑 */
const userRegisterController = async (req, res) => {
  const {email, userName, password} = req.body
  if (!email || !userName || !password) {
    res.send(resHandler(-1, '参数异常'))
    return
  }
  let p = new selectParamsFn(`user_name`, `t_system_user`, `user_name = '${userName}'`) // 查询用户名是否已存在
  let p2 = new selectParamsFn(`email`, `t_system_user`, `email = '${email}'`) // 查询邮箱是否已存在
  let queryUserNameResult = await selectFn(p)
  let queryEmailResult = await selectFn(p2)
  if (queryUserNameResult.length > 0) {
    res.send(resHandler(-1, `注册失败！用户名'${userName}'已存在`))
    return
  }
  if (queryEmailResult.length > 0) {
    res.send(resHandler(-1, `注册失败！邮箱'${userName}'已存在`))
    return
  }
  let p3 = new insertParamsFn(
    `t_system_user`,
    `email = '${email}',user_name = '${userName}',password = '${password}'`)
  let insertResult = await insertFn(p3)
  if (insertResult.affectedRows > 0) {
    res.send(resHandler(200, '注册成功！'))
  }
}

/** 用户登录接口 业务逻辑 */
const userLoginController = async (req,res) => {
  const {userName,password,email} = req.body
  if(!password){
    res.send(resHandler(-1,'参数异常'))
    return
  }
  if(!!userName){
    // 用户名 + 密码登录
    // 查询是否有当前用户名的账户
    let queryUserParams = new selectParamsFn(`user_name,password`,`t_system_user`,`user_name = '${userName}'`)
    let queryUserRes = await selectFn(queryUserParams)
    if(queryUserRes.length <= 0){
      res.send(resHandler(-1,'暂无此用户信息'))
      return
    }
    let userPwd = queryUserRes[0]['password']
    if(password === userPwd){
      let userInfoParams = new selectParamsFn(`user_id,user_name,email`,`t_system_user`,`user_name = '${userName}'`)
      let userInfoRes = await selectFn(userInfoParams)
      let userInfo = userInfoRes[0]
      vertoken.setToken(userInfo['user_id'], userInfo['user_name']).then(token => {
        res.send(resHandler(200, '登录成功', {
          token,
          userInfo: userInfo
        }))
      })
    } else {
      res.send(resHandler(-1,'密码错误'))
    }
  }
  if(!!email){
    // 邮箱 + 密码登录
    // 查询是否有当前用户名的账户
    let queryUserParams = new selectParamsFn(`email,password`,`t_system_user`,`email = '${email}'`)
    let queryUserRes = await selectFn(queryUserParams)
    if(queryUserRes.length <= 0){
      res.send(resHandler(-1,'暂无此用户信息'))
      return
    }
    let userPwd = queryUserRes[0]['password']
    if(password === userPwd){
      let userInfoParams = new selectParamsFn(`user_id,user_name,email`,`t_system_user`,`email = '${email}'`)
      let userInfoRes = await selectFn(userInfoParams)
      let userInfo = formatData(userInfoRes[0])
      vertoken.setToken(userInfo['user_id'], userInfo['email']).then(token => {
        res.send(resHandler(200, '登录成功', {
          token,
          userInfo: userInfo
        }))
      })
    } else {
      res.send(resHandler(-1,'密码错误'))
    }
  }
}
module.exports = {
  userRegisterController,
  userLoginController
}
