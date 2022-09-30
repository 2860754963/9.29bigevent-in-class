$(function () {


    $(".abc").on('click', function () {
        $('.input').hide()
        $('.zhuce').show()

    })

    $(".def").on('click', function () {
        $('.input').show()
        $('.zhuce').hide()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象

            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , repwd: function (value) {
            // 拿到确认密码框的内容
            // 拿到密码框的内容 然后进行 判断
            let psdval = $('.zhuce [name=password]').val()
            if (psdval != value) {
                return `两次密码不一致`
            }

        }
    });

    // 登录请求
    $('.input .layui-btn').on('click', function (e) {
        e.preventDefault()

        // 发起请求
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $('#denglu').serialize(),
            success: function (res) {
                if (res.status != 0) {
                    layer.open({
                        title: '怎么回事小老弟',
                        content: `${res.message}`
                    });
                } else {
                    layer.open({
                        title: '恭喜你',
                        content: `${res.message}`
                    });
                    location.href = 'index.html'
                }
            }
        })

    })
    // 注册请求
    $('.zhuce .layui-btn').on('click', function (e) {
        e.preventDefault()
        // 发起请求
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.zhuce [name="username"]').val(),
                password: $('.zhuce [ name="password"]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    layer.open({
                        title: '换个名字吧'
                        , content: `${res.message}`
                    });
                } else {
                    layer.open({
                        title: '恭喜你'
                        , content: '注册成功'
                    });
                    $('.def').click()
                }
                $('#zhuce')[0].reset()
            }
        })


    })



})