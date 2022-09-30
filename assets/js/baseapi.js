$.ajaxPrefilter(function (options) {
    console.log(options.url);
    // 在发起请求之前  拼接路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})