// 这是mySQL连接池信息文件
const mysql = require("mysql")

// 创建连接池
const db = mysql.createPool({
  host: "127.0.0.1", // 连接到本机的数据库
  port: "3306", // MySQL默认端口 3306
  user: "root", // 用户名
  password: "root", // 数据库的密码
  database: "todo_project", // 指定数据库名称
  // multipleStatements: true,
  connectionLimit: 30, // 连接数量限制
})

// 连接新增MySQL事务处理
const connectHandler = () => new Promise((resolve, reject) => {
  db.getConnection((error, connection) => {
    if (error) {
      reject(error)
    } else {
      resolve(connection)
    }
  })
})

module.exports = connectHandler
