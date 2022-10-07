$.ajaxPrefilter(function (options) {

    // 在发起请求之前  拼接路径
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            // 请求头
            Authorization: localStorage.getItem('token') || ''
        }
    }
})
