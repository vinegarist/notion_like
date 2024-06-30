/**
 * @date 2024-05-16 10:17:02
 * @desc 基于每次调用mysql模块都需要编写大量重复的sql语句 如select/update/delete/insert等，由此对数据库查询操作进行封装，减少sql语句的编写
 * 同时采用Promise，解决多步骤sql回调地域的问题
 * */
const connectHandler = require('./pool')
const checkType = require('../utils/checkType')


/**
 * @date 2024-05-16 10:41:49
 * @desc 对查询结果 Promise对象做处理 根据err和result改变Promise的状态 reject or resolve
 * @param err {Error} 错误日志对象
 * @param result {Object} SQL操作结果 可能是查询后的数据 也可能是修改、删除、更新后的结果对象
 * @param resolve {Function} Promise成功后的回调
 * @param reject {Function} Promise失败后的回调
 * */
const dataResolveFn = (err, result, resolve, reject, connection = null) => {
  if (err) {
    console.error(`ERROR IN MYSQL:${err}`)
    if (connection) {
      connection.rollback()
      connection.release()
    }
    reject(err)
    throw err
  } else {
    // 请求成功后 释放连接
    if (connection) {
      connection.commit()
      connection.release()
    }
    // 查询或操作结果返回调用者
    resolve(result)
  }
}


/**
 * @date 2024-05-16 13:38:49
 * @desc 封装查询函数所需的参数 工厂模式 构造查询函数selectFn所需要的参数并返回
 * @param {string} column 要查询的列名称
 * @param {string} table 要查询的表名
 * @param {string} term 查询条件
 * @return {{column: string,table: string,term: string}}
 * */
function selectParamsFn(column, table, term) {
  if(checkType(column) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：column不是string类型`)
  }
  if(checkType(table) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：table不是string类型`)
  }
  if(checkType(term) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：term不是string类型`)
  }
  this.column = column
  this.table = table
  this.term = term
}

/**
 * @date 2024-05-16 10:32:31
 * @desc 查询函数 select .. from .. where ..
 * 查询语句不需要开启MySQL事务
 * @param params {{column: string,table: string,term: string}} column:要查询的列名称,table:要查询的表名,term:条件
 * */
const selectFn = (params) => {
  return new Promise(async (resolve, reject) => {
    const connection = await connectHandler()
    connection.query(
      `SELECT ${params.column} FROM ${params.table} WHERE ${params.term}`,
      (err, result) => dataResolveFn(err, result, resolve, reject, connection)
    )
  })
}

/**
 * @date 2024-05-16 14:21:45
 * @desc 封装插入函数所需的参数 工厂模式 构造插入函数insertFn所需要的参数并返回
 * @param params {{table: string,set: string}} table:要插入的表名,set:条件
 * @return {{table: string,set: string}}
 * */
function insertParamsFn(table,set){
  if(checkType(table) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：table不是string类型`)
  }
  if(checkType(set) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：set不是string类型`)
  }
  this.table = table
  this.set = set
}

/**
 * @date 2024-05-16 10:47:40
 * @desc MySQL插入函数封装
 * @param params {{table: string,set: string}} table:要查询的表名,set:要插入的数据
 * */
const insertFn = (params) => {
  return new Promise(async (resolve, reject) => {
    const connection = await connectHandler()
    // 由于插入语句涉及到数据表数据的更新，这里开启MySQL事务，操作失败后数据回滚
    connection.beginTransaction(error => {
      if (error) {
        reject('事务开启失败')
      } else {
        connection.query(
          `INSERT INTO ${params.table} SET ${params.set}`,
          (err, result) => dataResolveFn(err, result, resolve, reject, connection)
        )
      }
    })
  })
}

/**
 * @date 2024-05-16 14:21:45
 * @desc 封装更新函数所需的参数 工厂模式 构造更新函数updateFn所需要的参数并返回
 * @param params {{table: string,set: string,term: string}} table:要查询的表名,set:要插入的数据,term:条件
 * @return {{table: string,set: string,term: string}}
 * */
function updateParamsFn(table,set,term){
  if(checkType(table) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：table不是string类型`)
  }
  if(checkType(set) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：set不是string类型`)
  }
  if(checkType(term) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：term不是string类型`)
  }
  this.table = table
  this.set = set
  this.term = term
}

/**
 * @date 2024-05-16 14:45:31
 * @desc MySQL更新函数封装(update)
 * @param params {{table: string,set: string,term: string}} table:要查询的表名,set:要插入的数据,term:条件
 * */
const updateFn = (params) => {
  return new Promise(async (resolve, reject) => {
    const connection = await connectHandler()
    connection.beginTransaction(error => {
      if(error){
        reject('事务开启失败')
      } else {
        connection.query(
          `UPDATE ${params.table} SET ${params.set} WHERE ${params.term}`,
          (err, result) => dataResolveFn(err, result, resolve, reject, connection)
        )
      }
    })
  })
}

/**
 * @date 2024-05-16 15:14:38
 * @desc 封装删除函数所需的参数 工厂模式 构造删除函数deleteFn所需要的参数并返回
 * @param params {{table: string,term: string}} table:要查询的表名,term:条件
 * @return {{table: string,term: string}}
 * */
function deleteParamsFn(table,term){
  if(checkType(table) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：table不是string类型`)
  }
  if(checkType(term) !== 'string'){
    throw new Error(`selectParamsFn \t 参数：term不是string类型`)
  }
  this.table = table
  this.term = term
}

/**
 * @date 2024-05-16 15:12:43
 * @desc MySQL删除函数封装(delete)
 * @param params {{table: string,term: string}} table:要查询的表名,term:条件
 * */
const deleteFn = (params) => {
  return new Promise(async (resolve, reject) => {
    const connection = await connectHandler()
    connection.beginTransaction(error => {
      if(error){
        reject('事务开启失败')
      } else {
        connection.query(
          `DELETE FROM ${params.table} WHERE ${params.term}`,
          (err, result) => dataResolveFn(err, result, resolve, reject, connection)
        )
      }
    })
  })
}

/**
 * @desc MySQL多表或聚合函数查询语句封装
 * @param {string} sql sql语句
 * @param {Array | null} term 查询条件
 * */
const baseQueryFn = (sql,term) => {
  return new Promise(async (resolve, reject) => {
    const connection = await connectHandler()
    connection.query(
      sql,
      term,
      (err, result) => dataResolveFn(err, result, resolve, reject, connection)
    )
  })
}

module.exports = {
  selectFn,
  selectParamsFn,
  insertFn,
  insertParamsFn,
  updateFn,
  updateParamsFn,
  deleteFn,
  deleteParamsFn,
  baseQueryFn
}
