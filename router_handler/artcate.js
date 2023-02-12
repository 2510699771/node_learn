// 对应注册的处理函数
const db = require('../db/index')




// 获取文章列表
exports.getarticlecates = (req, res) => {

    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'

    db.query(sql, (err, results) => {

        //执行sql 失败
        if (err) { return res.cc(err.message) }

        res.send({ status: 0, message: '获取文章列表成功', data: results })
    })

}

// 新增文章
exports.addarticlecates = (req, res) => {

    // 1.定义查重sql语句
    const sql = 'select * from ev_article_cate where name=? or alias=?'

    db.query(sql, [req.body.name, req.body.alias], (err, results) => {

        //执行sql 失败
        if (err) { return res.cc(err.message) }

        //  判断数据length
        if (results.length === 2) { return res.cc('分类名称与分类别名被占用，请更换后重试！') }

        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) { return res.cc('分类名称与分类别名被占用，请更换后重试！') }

        if (results.length === 1 && results[0].name === req.body.name) { return res.cc('分类名称被占用，请更换后重试！') }

        if (results.length === 1 && results[0].alias === req.body.alias) { return res.cc('分类别名被占用，请更换后重试！') }


        // 分类名称和分类别名都可用
        // 定义插入文章分类sql语句  
        const sql = 'insert into ev_article_cate set?'
        db.query(sql, req.body, (err, results) => {

            //执行sql 失败
            if (err) { return res.cc(err.message) }

            // 是否成功
            if (results.affectedRows !== 1) { return res.cc('新增文章分类失败') }

            res.cc('新增文章分类成功!', 0)
        })

    })
}


// 根据文章id删除文章
exports.deletecatebyid = (req, res) => {

    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {

        //执行sql 失败
        if (err) { return res.cc(err.message) }


        // 是否成功
        if (results.affectedRows !== 1) { return res.cc('删除文章分类失败！') }

        res.cc('删除文章分类成功!', 0)

    })
}