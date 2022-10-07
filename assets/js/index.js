
// 这里在主页发起请求

function qingqiu() {
    $.ajax({
        url: "/my/userinfo",
        type: "get",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            if (res.status == 1) {
                location.href = 'login.html'
            } else {
                let name = res.data.username
                $('.name').html(name)
                if (res.data.user_pic == null) {
                    $('img[id="unameimg"]').hide()
                    $('.zimu').show()
                } else {
                    $('img[id="unameimg"]').attr('src', res.data.user_pic).show()
                    $('.zimu').attr('src', res.data.user_pic).hide()
                }
                xuanran(res)
            }
        }

    });
}
qingqiu()
let form = layui.form
function xuanran(res) {
    let { id, username, nickname, email, user_pic } = res.data
    // form.val("formTest", {
    //     'id': id,
    //     'username': username,
    //     'nickname': nickname,
    //     'email': email,
    // });
    form.val('formuserinfo', res.data)
}
var layer = layui.layer;

$('#formuserinfo').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        url: "/my/userinfo",
        type: "post",
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data: {
            id: $('#formuserinfo [name="id"]').val(),
            nickname: $('#formuserinfo [name="nickname"]').val(),
            email: $('#formuserinfo [name="email"]').val(),
        },
        success: function (res) {
            if (res.status != 0) {
                layer.open({
                    title: '修改结果'
                    , content: '修改失败啦，重新修改吧~'
                });
            } else {
                layer.open({
                    title: '修改结果'
                    , content: '恭喜你成功啦~'
                });
                qingqiu()
            }

        }
    })




})

