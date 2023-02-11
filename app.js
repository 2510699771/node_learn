// 导入express模块
const express = require('express')

// 创建express服务器实例
const app = express()

// 1.
const joi = require('joi')

// 配置跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件  注意：这个中间件，只能解析application/x/www/form/urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前封装res.cc()

app.use((req, res, next) => {
    // status:1表示失败状态
    // err可能是失败对象 也可能是一个失败字符串
    res.cc = function (err, status = 1) {
        res.send({ status, message: err instanceof Error ? err.message : err })
    }
    next()
})


// 导入并注册 路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)



// 2.定义错误级别中间件
app.use((err, req, res, next) => {

    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) { return res.cc(err) }

    // 未知错误
    res.cc(err)
})



app.listen(3007, () => {
    console.log('api server running at http:/127.0.0.1:3007');
})