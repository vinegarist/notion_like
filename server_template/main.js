const express = require("express")
const {expressjwt: JWT} = require("express-jwt")
const jsonwebtoken = require("jsonwebtoken")
const parseToken = require("./middleware/parseToken")
const morgan = require("morgan")
const app = express()
const PORT = 9292 // 应用启动端口号 本地默认启动http://localhost:9292

// 通过cors解决跨域的问题
const cors = require("cors")
app.use(cors("*"))

// 使用express的静态资源托管
app.use(express.static("public"))

// 解决post请求获取参数与响应的问题
const bodyParser = require("body-parser")

// 上传文件必须要把其配置为true,否则二进制文件转化的时候没有文件后缀名
app.use(bodyParser.urlencoded({extended: true}))

// 解析token获取用户信息
app.use(function (req, res, next) {
  parseToken(req, res, next)
})

//验证token是否过期并规定那些路由不需要验证
app.use(
  JWT({
    secret: "todo_project", // 密钥
    algorithms: ["HS256"]
  }).unless({
    path: ["/v1/system/userLogin", "/v1/system/userRegister", '/v1/system/userUploadAvatar', '/public/*'] // 不需要验证的接口名称
  })
)

// 日志记录中间件
morgan.token('body', (req, res) => JSON.stringify(req.body)) // 记录请求参数
morgan.token('response', (req, res) => JSON.stringify(res.locals.data)) // 记录返回值

const logger = morgan(':method :url :status :response-time ms - :response :body', {
  stream: process.stdout // 将日志输出到控制台 一般在控制台输出就可以
})
app.use(logger)

// 接口引入
const userRouter = require('./router/user.router')
const todoRouter = require('./router/todo.router')
// 接口使用
app.use('/v1', userRouter)
app.use('/v1', todoRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
