const resHandler = require("../utils/response");
const randomId = require('../utils/randomId')
const formatData = require('../utils/formatData')
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

/** 用户创办日程 业务逻辑 */
const todoAddController = async (req, res) => {
  let {createUser, createTime, thingsName, thingsDetail, thingsStatus, startTime, endTime} = req.body
  if (!createUser || !createTime || !thingsName || !thingsDetail || !thingsStatus || !startTime || !endTime) {
    res.send(resHandler(-1, '参数异常'))
    return
  }
  let insertParams = new insertParamsFn(
    `t_todo`,
    `create_user = '${createUser}',create_time = '${createTime}',things_name = '${thingsName}',things_detail = '${thingsDetail}',
    things_status = '${thingsStatus}',start_time = '${startTime}',end_time = '${endTime}'
  `)
  let insertRes = await insertFn(insertParams)
  if (insertRes.affectedRows > 0) {
    res.send(resHandler(200, '日程创建成功'))
  } else {
    res.send(resHandler(-1, '日程创建失败'))
  }
}

const todoDeleteController = async (req, res) => {
  let {todoId,createUser} = req.body
  if(!todoId || !createUser){
    res.send(resHandler(-1,'参数异常'))
    return
  }
  let deleteParams = new deleteParamsFn(`t_todo`,`create_user = '${createUser}' and id = '${todoId}'`)
  let deleteRes = await deleteFn(deleteParams)
  if(deleteRes.affectedRows > 0){
    res.send(resHandler(200,'删除成功'))
  } else {
    res.send(resHandler(-1,'删除失败'))
  }
}

/** 根据日期查询某一天的日程 */
const todoSearchByDateController = async (req, res) => {
  let {startTime, createUser} = req.body
  if (!startTime || !createUser) {
    res.send(resHandler(-1, '参数异常'))
    return
  }
  let selectParams = new selectParamsFn(`*`,
    `t_todo`,
    `create_user = '${createUser}' and start_time like '%${startTime}%'`
  )
  let selectRes = await selectFn(selectParams)
  res.send(resHandler(200,'查询成功',formatData(selectRes)))
}

/** 根据日程名关键词查询日程 */
const todoSearchByNameController = async (req, res) => {
  let {createUser,keyword} = req.body
  if(!createUser || !keyword){
    res.send(resHandler(-1,'参数异常'))
    return
  }
  let selectSql = `select * from t_todo t1 left join t_system_user t2 on t1.create_user = t2.user_id where t1.create_user = ? and t1.things_name like '%${keyword}%'`
  let selectRes = await baseQueryFn(selectSql,[createUser])
  res.send(resHandler(200,'查询成功',formatData(selectRes)))
}

/** 查询当前登录的用户所有的待办日程事项 */
const userTodoListController = async (req, res) => {
  let {createUser,month} = req.body
  if(!createUser || !month){
    res.send(resHandler(-1,'参数异常'))
    return
  }
  let selectParams = new selectParamsFn(`*`,`t_todo`,`create_user = '${createUser}' and start_time like '%${month}%'`)
  let selectRes = await selectFn(selectParams)
  res.send(resHandler(200,'查询成功',formatData(selectRes)))
}

module.exports = {
  todoAddController,
  todoDeleteController,
  todoSearchByDateController,
  todoSearchByNameController,
  userTodoListController
}
