$(function () {
    let form = layui.form
    var laypage = layui.laypage;
    // 所有分类请求  // 渲染所有分类

    // 格式化时间函数,这里需要通过 template模板进行导入
    template.defaults.imports.formatDateTime = function (date) {
        if (date == "" || !date) {
            return "";
        }
        var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
    // 所有 文章分类  
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            // 模板引擎
            console.log(res);
            let str = template('temp_suoyoufenlei', res)
            // console.log(str);
            // 这里会出现 加载不出来的情况
            $('[name="suoyoufemlei"]').html(str)
            form.render()
        }
    });

    // 渲染文章列表  方法
    let obj = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '已发布',
    }
    getLiebiao()
    function getLiebiao() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: obj,
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('😥获取文章列表失败了！')
                }
                layer.msg('😘获取文章列表成功了~~')
                let str = template('temp_liebiao', res)
                $('tbody').html(str)

                // 分页器
                laypage.render({
                    elem: 'fenyeqi' //注意，这里的 test1 是 ID，不用加 # 号
                    , count: res.total //数据总数，从服务端得到
                    , layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                    , limits: [2, 3, 5, 10]
                    , limit: obj.pagesize
                    , jump: function (obj1) {
                        //obj包含了当前分页的所有参数，比如：
                        console.log(obj1.curr); //得到当前页，以便向服务端请求对应页的数据。
                        console.log(obj1.limit); //得到每页显示的条数
                        obj.pagenum = obj1.curr
                        obj.pagesize = obj1.limit
                        //首次不执行 这里因为 在点击删除的时候 需要让他在执行一次，让文章数据渲染 出来 也可以将 这段 渲染代码 放到 删除按钮中，并对pagenum当前页码数-1操作
                        // if (!first) {
                        // getLiebiao()   这里调用 的话，会陷入循环
                        $.ajax({
                            type: "GET",
                            url: "/my/article/list",
                            data: obj,
                            success: function (res) {
                                console.log(res);
                                if (res.status != 0) {
                                    return layer.msg('😥获取文章列表失败了！')
                                }
                                layer.msg('😘获取文章列表成功了~~')
                                let str = template('temp_liebiao', res)
                                $('tbody').html(str)
                            }
                        });
                        // }
                    }
                });

            }
        });
    }
    // 对立即筛选按钮绑定事件
    $('#shaixuan').on('click', function (e) {
        e.preventDefault()
        obj.cate_id = $('[name="suoyoufemlei"]').val()
        obj.state = $('[name="state"]').val()
        getLiebiao()
    })
    // 对编辑按钮 绑定 事件 事件委托
    $('body').on('click', '#bianji', function () {
        let id = $(this).attr('data-id')
        // 发起请求，将得到的内容 写入缓存，跳转到  发表文章进行渲染
        $.ajax({
            type: "GET",
            url: "/my/article/" + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('😥获取文章失败了！')
                }
                layer.msg('😘获取文章成功了~~')
                // 成功之后，将数据 写入本地缓存，跳转到  发表文章进行渲染
                console.log(res);
                localStorage.setItem('data', JSON.stringify(res.data))
                location.href = '../../文章/发表.html'
            }
        });
    })
    // 对删除按钮 绑定 点击事件 事件委托
    $('body').on('click', '#delete', function () {
        let id = $('#delete').attr('data-id')
        // 发起请求
        $.ajax({
            type: "GET",
            url: "/my/article/delete/" + id,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('😥删除文章失败了！' + res.message)
                }
                layer.msg('😘删除文章列表成功了~~')
                // 重新渲染
                getLiebiao()
            }
        });

    })




})