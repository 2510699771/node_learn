const joi = require('joi')

const name = joi.string().required()

const alias = joi.string().alphanum().required()




const id = joi.number().integer().min(1).required()






// 头像规则
exports.update_avatar_schema = {
    body: { name, alias }
}

// 删除id验证
exports.delete_avatar_schema = {
    body: { id }
}