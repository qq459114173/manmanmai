$(function() {
    var page = 1;
    var pageSum = 0;
    var brandId = 439;//乐视
    var id = location.hash.substr(1, ) || 0;
    pageRequest(page, id);
    commodityName(id);

    //发送商品名称api请求
    function commodityName(id) {
        $.ajax({
            url: 'http://localhost:9090/api/getcategorybyid',
            data: {
                categoryid: id,
            },
            success: function(obj) {
                $('#subTitle a').html(obj.result[0].category + '>');
            },
        })
    }

    //发送商品列表api请求
    function pageRequest(page, id) {
        $.ajaxSettings.async = false //设置为同步请求
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: {
                categoryid: id,
                pageid: page
            },
            success: function(obj) {
                // 获取总页数
                pageSum = Math.ceil(obj.totalCount / obj.pagesize);
                var lis = obj.result;
                $(lis).each(function(index, ele) {
                    //判断当前元素的品牌id是否是指定id;
                    if ($(ele)[0].brandId == brandId) {
                        var html = template('listTpl', { list: ele});
                        $('#section .content .mui-table-view').append(html);
                    }
                });
            },
        })
    }

    for (var i = 2; i <= pageSum; i++) {
        pageRequest(i, id);
    }
    //点击上一页
    $('#page .pre a').click(function(e) {
        e = e || window.event;
        e.preventDefault();
        alert('已经是第一页啦！')
    })

    //点击下一页
    $('#page .next a').click(function(e) {
        e = e || window.event;
        e.preventDefault();
        alert('已经是最后一页啦！')
    })

    //选中翻页
    $('#select').change(function() {
        page = $(this).val().split('/')[0]
        pageRequest(page, id);
    })


        //点击列表进入商品详情
         $('#section .mui-table-view li').on('click', 'a', function() {
             $(this).attr('href', '10-dustuibDetails.html#' + this.id);

         })
})
