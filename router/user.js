const express = require('express')
const router = express.Router()

const user_hander = require('../router_handler/user')



// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2.导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册
router.post('/reguser', expressJoi(reg_login_schema), user_hander.regUser)

// 登陆
router.post('/login', expressJoi(reg_login_schema), user_hander.login)





module.exports = router