/**
 * @desc 封装一个生成随机id的方法，返回值为生成的随机id
 * */

const {v4: uuidv4} = require('uuid')

const randomId = () => {
  const id = uuidv4()
  return id
}

module.exports = randomId
