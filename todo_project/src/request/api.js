import request from "./http";

/** 用户登录接口 */
export const userLoginApi = params => request.post('/system/userLogin', params)

/** 用户注册接口 */
export const userRegisterApi = params => request.post('/system/userRegister', params)

/** 用户创建日程接口 */
export const addApi = params => request.post('/todo/add', params)

/** 用户删除日程接口 */
export const deleteApi = params => request.post('/todo/delete', params)

/** 根据日期查询用户某一天的日程 */
export const searchByDateApi = params => request.post('/todo/searchByDate', params)

/** 根据日程名称模糊查询当前用户所创办的日程 */
export const searchByNameApi = params => request.post('/todo/searchByName', params)

/** 查询当前登录用户创建的所有日程 */
export const userTodoListApi = params => request.post('/todo/userTodoList', params)
