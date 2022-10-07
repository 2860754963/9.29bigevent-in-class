$(function () {
    let layer = layui.layer
    let form = layui.form
    getXuanran()
    function getXuanran() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取列表数据失败了！！')
                }
                layer.msg('😘获取列表数据成功')

                // 模板引擎渲染
                let str = template('tem_tbdy', res)
                $('tbody').html(str)
            }
        });
    }

    // 对添加类别 按钮添加绑定事件
    let a1 = null
    $('#addleibie').click(function () {
        // 弹出 页面级的  对话框 
        a1 = layer.open({
            title: '添加文章分类',
            area: ['500px', '270px'],
            type: 1,
            // 在这里  content里可以直接放入模板字符串，
            //   也可以通过 模板引擎的方式，写入  html中 ，引入进来   这里采用模板引擎的方法
            content: $('#tem_addlei').html(),
        });
    })
    // 对弹出框中的 确认添加 按钮  绑定点击事件
    $('body').on('click', '#querenadd', function (e) {
        e.preventDefault()
        // 因为  在表单中 已经设置过 name值 ，所以可以直接 整体拿到
        // 拿到数据  发起请求
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $('#zengjialeibie').serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！！')
                }
                layer.msg('😘新增文章分类成功')
                layer.close(a1)
                getXuanran()
            }
        });
    })
    let a2 = null
    // 对编辑 按钮 绑定事件 事件委托
    $('body').on('click', '#leibie_bianji', function () {
        console.log(1111);
        //   弹出 层
        a2 = layer.open({
            title: '编辑文章分类',
            area: ['500px', '270px'],
            type: 1,
            // 在这里  content里可以直接放入模板字符串，
            //   也可以通过 模板引擎的方式，写入  html中 ，引入进来   这里采用模板字符串的方法
            content: ` <form class="layui-form" style="padding: 20px;"  lay-filter="gengxin" id='xiugaibiaodan'>
                <input type="hidden" name="Id">
               <div class="layui-form-item">
                   <label class="layui-form-label">分类名称</label>
                   <div class="layui-input-block">
                       <input type="text" name="name" required lay-verify="required" placeholder="请输入分类名称" autocomplete="off"
                           class="layui-input">
                   </div>
               </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">分类别名</label>
                    <div class="layui-input-block">
                        <input type="text" name="alias" required lay-verify="required" placeholder="请输入分类别名" autocomplete="off"
                            class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo" id="querenxiugai">确认修改</button>
                      
                    </div>
                </div>
            </form>`,
        });
        // console.log($('#leibie_bianji').attr('data-id'));
        // 发起请求 获取文章分类详情 ，将 得到的数据写入 以上 模板中
        $.ajax({
            type: "GET",
            // 这里的id 是 你点击哪个按钮的id
            url: "/my/article/cates/" + $(this).attr('data-id'),
            success: function (res) {
                // 得到数据  将数据填入 表单中
                form.val('gengxin', res.data);
            }
        });
    })
    // 对确认修改  绑定事件 事件委托
    $('body').on('click', '#querenxiugai', function (e) {
        e.preventDefault()
        //    拿到数据  发起请求
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $('#xiugaibiaodan').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改文章分类失败！！')
                }
                layer.msg('😘修改文章分类成功')
                layer.close(a2)
                getXuanran()
            }
        });
    })

    // 对删除按钮 绑定 点击事件
    $('body').on('click', '#leibie_shanchu', function () {
        console.log(2222222);
        // 发起请求
        $.ajax({
            type: "GET",
            url: "/my/article/deletecate/" + $(this).attr('data-id'),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('删除文章分类失败！！')
                }
                layer.msg('😘删除文章分类成功')
                getXuanran()
            }
        });
    })












})