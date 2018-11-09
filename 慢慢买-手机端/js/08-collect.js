$(function() {
    var areaid = 0;
    var shopid = 0;
    // 发送凑单品列表API
    list(shopid,areaid);
    //发送凑单区域API
     region();
    //发送凑单店铺API
    store();
    //给头部商店动态添加点击事件
    storeChick(shopid,areaid);
    //给头部地区动态添加点击事件
    regionChick(shopid,areaid);
})

    // 发送凑单品列表API
    function list(shopid,areaid){
         $.ajax({
        url: 'http://localhost:9090/api/getgsproduct',
        data: {
            shopid: shopid,
            areaid: areaid
        },
        success: function(obj) {
            var html = template('collectTpl', obj);
            $('#section ul').html(html);
        },
    });
    }

    function region(){
        $.ajax({
        url: 'http://localhost:9090/api/getgsshoparea',
        success: function(obj) {
            var html = template('collectTpl3', obj);
            $('#region').html(html);

        },
    });
    }

    function store(){
        $.ajax({
        url: 'http://localhost:9090/api/getgsshop',
        success: function(obj) {
            var html = template('collectTpl2', obj);
            $('#store').html(html);
        },
    });
    }

    function storeChick(shopid,areaid){
         //给头部商店动态添加点击事件
         $('#store').on('change',function(){
         
            $(this).children('option').each(function(index,ele){
                if($(ele).prop('selected')){
                    shopid=index;
                }
            });
            list(shopid,areaid);
         });
    }

    function regionChick(shopid,areaid){
         $('#region').on('change',function(){
            
            $(this).children('option').each(function(index,ele){
                if($(ele).prop('selected')){
                    areaid=index;
                }
            });
            list(shopid,areaid);
         });
    }