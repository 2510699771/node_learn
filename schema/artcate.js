const joi = require('joi')

const name = joi.string().required()

const alias = joi.string().alphanum().required()











// 头像规则
exports.update_avatar_schema = {
    body: { name, alias }
}