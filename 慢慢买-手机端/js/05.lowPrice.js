$(function() {
    var id = 0;
    // 页面滑动初始化
    lowPriceInit()
        //发送白菜价标题API请求
    getTitle()
    //发送白菜价商品列表API请求
    lowPriceList(id)
    //给白菜价导航栏添加点击事件
    lowPriceClick()
})

function lowPriceInit() {
    // 页面滑动初始化
    var swiper = new Swiper('.swiper-container', {
        direction: 'horizontal', //滑动方向
        slidesPerView: 'auto', //轮播图宽高自适应
        freeMode: true, //是否开启弹簧效果
        scrollbar: {
            el: '.swiper-scrollbar', //添加滚动条
        },
        mousewheel: true, //允许鼠标滚轮滚动;
    });
}

function getTitle() {
    $.ajaxSettings.async = false //设置为同步请求
    $.ajax({
        url: 'http://localhost:9090/api/getbaicaijiatitle',
        success: function(obj) {
            var html = template('lowPriceTpl', obj);
            $('#nav ul').html(html);
        },
    })
}

function lowPriceList(id) {
    $.ajax({
        url: 'http://localhost:9090/api/getbaicaijiaproduct',
        data: {
            titleid: id,
        },
        success: function(obj) {
            var html = template('lowPriceTpl2', obj);
            $('#section ul').html(html);
        },
    })
}

function lowPriceClick() {
    //给白菜价导航栏添加点击事件
    $('#nav ul').on('click', 'a', function(e) {
        e = e || window.event;
        e.preventDefault(); //阻止事件默认行为;
        id = this.id;
        lowPriceList(id);
        $(this).parent().attr('class', 'active').siblings().removeClass('active');
    })
}
