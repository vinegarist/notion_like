/**
 * @desc 将发送邮件的操作提取
 * */
const nodemailer = require('nodemailer')
const emailConfig = require('../config/emailConfig')

/**
 * @date 2024-05-15 15:28:06
 * @desc 发送邮件的方法
 * */
const transPort = nodemailer.createTransport({
  service: 'qq',
  host: 'smtp.qq.com',
  port: 456,
  secure: true,
  auth: {
    pass: emailConfig.pass,
    user: emailConfig.user
  }
})

module.exports = {
  transPort
}

