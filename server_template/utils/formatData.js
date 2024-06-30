/**
 * @desc 格式化数据，将数据表中的下划线命名的数据转换为小驼峰命名的数据，如user_id -> userId、user_avatar -> userAvatar
 * @param {Object | Array} data 需要转换的数据
 * @author nine
 * */
const formatData = (data) => {
  const dataType = checkDataType(data)
  if(dataType === 'object'){
    let result = {}
    const REG = /\_(\w)/g
    for (const key in data) {
      const newKey = key.replace(REG,function (str,r) {
        return r.toUpperCase()
      })
      if(checkDataType(data[key]) === 'object'){
        result[newKey] = formatData(data[key])
      } else {
        result[newKey] = data[key]
      }
    }
    return result
  } else if(dataType === 'array'){
    let newArr = []
    for (const value of data) {
      if(checkDataType(value) === 'object'){
        let result = {}
        const REG = /\_(\w)/g
        for (const key in value) {
          const newKey = key.replace(REG,function (str,r) {
            return r.toUpperCase()
          })
          if(checkDataType(value[key]) === 'object'){
            result[newKey] = formatData(value[key])
          } else {
            result[newKey] = value[key]
          }
        }
        newArr.push(result)
      }
    }
    return newArr
  }
}

/**
 * @desc 封装一个检测数据类型的方法
 * @param {Object | Array |Number | Boolean| String } data
 * @return {string}
 * @author nine
 * */
function checkDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLocaleLowerCase()
}

module.exports = formatData
