/**
 * @desc t_todo 待办事项表涉及
 * id           int         主键自增
 * create_time  varchar     日程创建时间
 * create_user  int         日程创建用户id
 * things_name  varchar     日程标题
 * things_detail varchar    日程详情
 * things_status int        日程状态 1重要 2紧急
 * start_time    varchar    开始时间
 * end_time      varchar    结束时间
 * */
const router = require('express').Router()
const {
    todoAddController,
    todoDeleteController,
    todoSearchByDateController,
    todoSearchByNameController,
    userTodoListController
} = require('../controller/todo.controller')

/** 用户创建日程 */
router.post('/todo/add', todoAddController)

/** 用户删除日程 */
router.post('/todo/delete',todoDeleteController)

/** 根据日期查询某一天的日程 */
router.post('/todo/searchByDate',todoSearchByDateController)

/** 根据日程名称查询日程详情 */
router.post('/todo/searchByName',todoSearchByNameController)

/** 获取当前登录用户的所有日程列表记录 */
router.post('/todo/userTodoList',userTodoListController)

module.exports = router
