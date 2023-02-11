const joi = require('joi')

// 定义用户名和密码的验证规则

const username = joi.string().alphanum().min(1).max(10).required()

const password = joi.string().pattern(new RegExp(/^[\S]{6,12}$/)).required()




// 定义验证注册和登陆表单对象的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}