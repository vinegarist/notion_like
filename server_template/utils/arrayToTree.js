/**
 * @desc 构造树形结构数据 无限层级
 * @param { Array } items 源数据
 * @param { string } key 构造相关的key
 */

const arrayToTree = (items,key) => {
  const result = [] // 结果
  const itemMap = {}

  // 先转成map存储
  for (const item of items) {
    itemMap[item[key]] = { ...item, children: [] }
  }

  for (const item of items) {
    const id = item[key]
    const parentId = item.parentId
    const treeItem = itemMap[id]

    if (parentId === 0) {
      result.push(treeItem)
    } else {
      if (!itemMap[parentId]) {
        itemMap[parentId] = { children: [] }
      }
      itemMap[parentId].children.push(treeItem)
    }
  }
  return result
};

module.exports = arrayToTree
