$(function() {
    var id = location.search.split('=')[1];
    var sumPage;
    // 遮罩层初始化
    maskedInit(id);
    //发送优惠券标题API请求
    coiponproductTitle(id)
        //发送遮罩层图片轮播API请求
    slideshow(id)   
        //添加点击事件，出现遮罩层和图片轮播
    maskedControl(id)
})

function maskedInit(id) {
    // 遮罩层初始化
    var index = 0;
    var gallery = mui('.mui-slider');
    $.ajaxSettings.async = false //设置为同步请求
    $.ajax({
        url: 'http://localhost:9090/api/getcouponproduct',
        data: {
            couponid: id,
        },
        success: function(obj) {
            var html = template('couponproductTpl', obj);
            $('#section ul').html(html);
        }
    });
}

function coiponproductTitle(id) {
    $.ajax({
        url: 'http://localhost:9090/api/getcoupon',
        success: function(obj) {

            var html = obj.result[id].couponTitle;
            $('#header h4').html(html + '优惠券');
        }
    });
}

function slideshow(id) {
    $.ajax({
        url: 'http://localhost:9090/api/getcouponproduct',
        data: {
            couponid: id,
        },
        success: function(obj) {
            var html = template('couponproductTpl2', obj);
            $('.mui-backdrop .mui-slider-group').html(html);
            sumPage = obj.result.length;
        }
    });
}

function maskedControl(id) {
    var index = 0;
    var gallery = mui('.mui-slider');
    $('#section ul').on('click', 'a', function() {
        //开启遮罩层
        if ($('.mui-backdrop').css('display') == 'none') {
            $('.mui-backdrop').css('display', 'block');
            if (id == 0) {
                index = this.id;
                gallery.slider().gotoItem(index);
            }
        }
        // 关闭遮罩层
        $('.mui-backdrop').click(function() {
            $('.mui-backdrop').css('display', 'none');
        })
    });

    //轮播图上下控件
    document.getElementById('left').onclick = function(e) {
        e.stopPropagation();
        if (index == 0) {
            alert('已经是第一张了')
        } else {
            index--;
            gallery.slider().gotoItem(index);
        }
    }
    document.getElementById('right').onclick = function(e) {
        e.stopPropagation();
        if (index == sumPage - 1) {
            alert('已经是最后一张了')
        } else {
            index++;
            gallery.slider().gotoItem(index);
        }
    }
}
