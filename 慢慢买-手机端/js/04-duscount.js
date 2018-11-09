$(function() {
    // 发送折扣商品列表API请求
    discount();
    //初始化图片懒加载
    init();
    //添加点击跳转
    jump();
})
function discount(){
     // 发送折扣商品列表API请求
    $.ajaxSettings.async = false //设置为同步请求
    $.ajax({
        url: 'http://localhost:9090/api/getinlanddiscount',
        success: function(obj) {
            var html = template('discountTpl', obj);
            $('#section ul').html(html);
        }
    });
}
function init(){
    Echo.init({
        offset: 0,
        throttle: 0
    });
}
function jump(){
     //添加点击事件
    $('#section .scroll_y').on('click','a',function(){
         $(this).attr('href', '04-discountList.html#' + this.id);
    })
}

