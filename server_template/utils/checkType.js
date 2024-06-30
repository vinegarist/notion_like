/**
 * @date 2024-05-16 13:55:51
 * @desc 封装一个工具函数 用于检查数据类型 支持任意类型
 * */
const checkType = (parameter) =>   Object.prototype.toString.call(parameter).slice(8,-1).toLowerCase()

module.exports = checkType

