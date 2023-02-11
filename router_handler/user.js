// 对应注册的处理函数
const db = require('../db/index')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const uesrinfo = req.body

    // 在数据库查重名称是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, uesrinfo.username, (err, results) => {

        //执行sql 失败
        if (err) { return res.cc(err) }

        // 用户名被占用判断
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        uesrinfo.password = bycrypt.hashSync(uesrinfo.password, 10)


        // bycrypt.hashSync() 对密码进行加密
        const sql = 'insert into ev_users set ?'

        db.query(sql, uesrinfo, (err, results) => {

            //执行sql 失败
            if (err) { return res.cc(err.message) }


            // 是否成功
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }

            res.send('操作成功', 0)
        })
    })

}




exports.login = (req, res) => {

    // 接收表单数据
    const uesrinfo = req.body

    // 定义SQL语句
    const sql = 'select * from ev_users where username=?'

    // 执行sql语句
    db.query(sql, uesrinfo.username, (err, results) => {

        //执行sql 失败
        if (err) { return res.cc(err.message) }

        // 是否成功
        if (results.affectedRows !== 1) { return res.cc('登陆失败！') }

        // 密码比较
        const compareResult = bycrypt.compareSync(uesrinfo.password, results[0].password)
        if (!compareResult) { return res.cc('密码不正确') }

        // 
        const user = { ...results[0], password: '', use_pic: '' }

        // 对用户秘钥进行加密，生成token秘钥
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

        res.send({ status: 0, message: '登陆成功', token: 'Bearer' + tokenStr })


    })

}