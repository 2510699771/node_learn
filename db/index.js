const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'mu_db_01'
})


// 共享db数据库连接对象
module.exports = db