const router = require('express').Router()
const resHandler = require('../utils/response')
const {
  userRegisterController,
  userLoginController
} = require('../controller/user.controller')

/** 用户注册接口 接口信息 */
router.post('/system/userRegister', userRegisterController)

/** 用户登录接口 接口信息 */
router.post('/system/userLogin',userLoginController)

/** 用户上传头像接口 接口信息 */
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/userImage/') // 设置文件存储路径
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname) // 设置文件名
  }
})
const upload = multer({storage})
router.post(
  '/system/userUploadAvatar',
  upload.single('avatar'),
  (req, res) => {
    const pic = req.file ? req.file.filename : null;
    const picUrl = pic ? pic : null;
    res.send(resHandler(200, '上传成功', {
      picUrl: picUrl
    }))
  }
)


module.exports = router
