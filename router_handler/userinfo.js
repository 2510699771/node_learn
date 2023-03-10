const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户信息
exports.getuserinfo = (req, res) => {

    // 定义查询用户信息的SQL语句
    const sql = 'select id , username,nickname,email,user_pic from ev_users where id=?'

    db.query(sql, req.user.id, (err, results) => {

        // 调用db.query() 执行SQL语句
        if (err) { return res.cc(err) }

        // 执行 SQL语句成功  查询为为空
        if (results.length !== 1) { return res.cc('获取用户数据失败') }

        // 用户信息获取成功
        res.send({ status: 0, message: '获取用户信息成功', data: results[0] })
    })
}

// 更新用户信息
exports.updteuserinfo = (req, res) => {

    // 定义待执行的SQL语句
    const sql = 'update ev_users set ? where id=?'
    // 调用db.query执行SQL语句 并传参
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行sql失败
        if (err) { return res.cc(err) }

        // 执行 SQL语句成功  影响行数不等于1
        if (results.length !== 1) { return res.cc('更新用户失败') }

        // 用户信息获取成功
        res.send({ status: 0, message: '更新用户信息成功' })
    })
}

// 更新密码
exports.updtepassword = (req, res) => {

    // 根据id查询用户的信息
    const sql = 'select * from ev_users where id=?'

    db.query(sql, req.user.id, (err, results) => {
        // 执行sql失败
        if (err) { return res.cc(err) }

        // 执行 SQL语句成功  影响行数不等于1
        if (results.length !== 1) { return res.cc('用户不存在') }

        // 判断用户输入旧密码是否正确
        const compareResult = bcrypt.compareSync(req.bodyoldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        // 更新数据库密码
        // 更新密码sql语句
        const sql = 'update ev_users set password=? where id=?'

        // 新密码加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        // 执行sql
        db.query(sql, [newPwd, req.user.id], (err, results) => {

            // 执行sql语句失败
            if (err) return res.cc(err)

            // 判断影响的行数
            if (results.length !== 1) { return res.cc('更新密码失败') }

            // 成功
            res.cc('更新密码成功！', 0)
        })
    })
}

// 更新头像地址
exports.updteavatar = (req, res) => {

    // 定义更新头像的sql语句
    const sql = 'update ev_users set user_pic=? where id=?'

    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {

        // 调用db.query() 执行SQL语句
        if (err) { return res.cc(err) }

        // 执行 SQL语句成功  查询为为空
        if (results.length !== 1) { return res.cc('更换头像失败') }

        res.cc('更新头像成功', 0)
    })

}