import axios, {Axios} from "axios";
import app from "@/main";

const request = axios.create({
  baseURL: 'http://localhost:9292/v1',
  timeout: 30000,
})

request.interceptors.request.use((config) => {
  // 如果是post请求方式，需要设置 “Content-Type:application/x-www-form-urlencoded”
  if(config.method === 'post'){
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
  }
  // 如果本地存储中有admin-token就将其添加到请求头header中，方便后端进行token认证
  if (!!window.sessionStorage.getItem('token')) {
    config.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem(
      'token',
    )}`
  }
  return config
},(error) => {
  console.log('http-error-->',error)
})

request.interceptors.response.use((response) => {
  const {data} = response
  // 如果没有获取到正确的状态码，则进行弹窗提示
  if(data.code === -1){
    app.$message.error(data.msg)
    return;
  }
  return Promise.resolve(data)
})
export default request