const express = require('express')
const router = express.Router()

// 导入处理函数
const userinfo_hander = require('../router_handler/userinfo')

// 导入验证中件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')


// 获取用户信息路由
router.get('/userinfo', userinfo_hander.getuserinfo)

// 修改用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_hander.updteuserinfo)

// 更新密码路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_hander.updtepassword)

// 更新头像路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_hander.updteavatar)


module.exports = router