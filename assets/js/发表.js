$(function () {
    let fuwenben = null
    let form = layui.form
    let layedit = layui.layedit;

    // 如果本地 缓存中 存在 data 则会渲染
    if (localStorage.getItem('data')) {
        // 这里采用 表单赋值
        form.val('tijiao', JSON.parse(localStorage.getItem('data')));
        // 当赋值完成后 清除本地中的数据
        localStorage.removeItem('data')
    }

    layui.use('layedit', function () {


        fuwenben = layedit.build('fuwenben', {
            tool: [
                'strong' //加粗
                , 'italic' //斜体
                , 'underline' //下划线
                , 'del' //删除线
                , '|' //分割线
                , 'left' //左对齐
                , 'center' //居中对齐
                , 'right' //右对齐
                , 'link' //超链接
                , 'unlink' //清除链接
                , 'face' //表情
                , 'image' //插入图片
                , 'help' //帮助
            ]
        });
    });
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 给 选择封面按钮绑定 点击事件

    $('#xuanzefengmian').click(function () {
        $('#wenjiankuang').click()
    })
    // 当文件筐被点击的时候
    $('#wenjiankuang').on('change', function (e) {
        //1. 拿到用户选择的文件
        var file = e.target.files[0]
        if (e.target.files.length == 0) {
            return layer.msg('😭请先上传图片呐！！！')
        }
        layer.msg('😘图片上传成功~')
        // 2.根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 3.先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 选择分类 发起请求
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('😭获取分类列表失败了！！')
            }
            layer.msg('😘获取分类列表成功~')
            console.log(res);
            let str = template('xuanzefenlei', res)
            $('#xialaxuanran').html(str)
            form.render()
        }
    });
    // 给确认添加 绑定点击事件  这里送的数据是  FormData 格式的
    $('#addqueren').click(function (e) {
        e.preventDefault()
        // 这里 因为送到后台的是 FormData 格式的
        // FormData 里边传的是dom 对象
        $('#fuwenben').html(layedit.getContent(fuwenben))
        let fd = new FormData($('#tijiao')[0])
        // 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 这里 的  得到画布内容为 异步操作，必须将 发起请求放入这里，在 得到内容后 再发起请求  
                fd.append('cover_img', blob)
                $.ajax({
                    type: "POST",
                    url: "/my/article/add",
                    contentType: false,
                    processData: false,
                    data: fd,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('😭新增文章失败了！！')
                        }
                        layer.msg('😘新增文章成功~')
                        setInterval(function () {
                            location.href = '../../文章/列表.html'
                        }, 500)


                    }
                });

            })

    })


})