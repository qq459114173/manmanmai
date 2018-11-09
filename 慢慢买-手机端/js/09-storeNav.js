$(function() {
    // 发送商城导航请求
      getNav();
    // 页面滑动初始化
    Init();
});

function getNav() {
    $.ajax({
        url: 'http://localhost:9090/api/getsitenav',
        success: function(obj) {
            var html = template('storeNavtpl', obj);
            $('#article .content').html(html);
        }
    });
}
function Init(){
   var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', //滑动方向
        slidesPerView: 'auto', //轮播图宽高自适应
        freeMode: true, //是否开启弹簧效果
        scrollbar: {
            el: '.swiper-scrollbar', //添加滚动条
        },
        mousewheel: true, //允许鼠标滚轮滚动;
    });
}
