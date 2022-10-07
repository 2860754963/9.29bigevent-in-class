$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 给上传绑定 点击事件
    $('#uploadimg').on('click', function () {
        $('#inputupload').click()
    })
    // input的点击事件


    // 为文件选择框绑定 change 事件
    $('#inputupload').on('change', function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('😭请选择照片！')
        }
        layer.msg('😘上传图片成功~')
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 给 确定按钮绑定  点击事件  
    $('#quedingupload').on('click', function () {
        console.log(2222);
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('😭上传照片失败！')
                }
                layer.msg('😘更换图片成功~')
                // 上传成功后 调用 index.js中的渲染 方法
                window.parent.qingqiu()
            }
        });



    })

})
