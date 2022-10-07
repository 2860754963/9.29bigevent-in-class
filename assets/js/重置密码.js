$(function () {
    // 对修改密码 按钮 绑定点击事件
    layer = layui.layer
    $('#change_password').on('click', function (e) {
        e.preventDefault()
        let miamyi = $('[name="newPwd"]').val()
        console.log(miamyi);
        let miamer = $('[name="confirmnewpwd"]').val()
        console.log(miamer);
        if (miamyi !== miamer) {
            return layer.msg('😥两次密码不一致')
        }
        console.log(1111);
        // 发起请求
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $('#mima').serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('😭更新密码失败了!' + res.message)
                }
                layer.msg('😘更新密码成功了')
                // 这里的reset() 方法是针对dom元素
                $('#mima')[0].reset()
            }
        });
    })

})