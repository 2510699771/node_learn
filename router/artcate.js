// 文章分类路由模块
const express = require('express')
const router = express.Router()


const artcate_hander = require('../router_handler/artcate')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

const { update_avatar_schema, delete_avatar_schema } = require('../schema/artcate')


// 获取文章列表
router.post('/cates', artcate_hander.getarticlecates)


// 新增文章分类的路由
router.post('/addcates', expressJoi(update_avatar_schema), artcate_hander.addarticlecates)


// 根据文章id删除文章分类路由
router.post('/deletecate:id', expressJoi(delete_avatar_schema), artcate_hander.deletecatebyid)











module.exports = router