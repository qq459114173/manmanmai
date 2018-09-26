$(function(){
        //设置导航栏点击事件
    $('#nav .domore').click(function(){
        if( $('#nav .more').css('display')=='none'){
            $('#nav .more').css('display','block');
        }else{
            $('#nav .more').css('display','none');
        }
        
    });

    //初始化注册页面按钮提示
    $('[data-toggle="tooltip"]').tooltip()


    //返回顶部
    $("#top").click(function(){
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset},800);
                return false;
            }
        }
    });
});


