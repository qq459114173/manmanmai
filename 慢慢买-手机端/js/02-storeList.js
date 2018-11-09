$(function() {
    var page = 1;
    var pageSum = 0;
    var id = location.hash.substr(1, ) || 0;
    //发送商品名称api请求
    commodityName(id);
    //发送商品列表api请求
    pageRequest(page, id);
    function pageRequest(page, id) {
        $.ajaxSettings.async = false //设置为同步请求
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: {
                categoryid: id,
                pageid: page
            },
            success: function(obj) {
                var html = template('listTpl', obj);
                pageSum = Math.ceil(obj.totalCount / obj.pagesize);
                $('#section .content .mui-table-view').html(html);
            },
        })
    }


    //动态添加页码值
    for (var i = 1; i <= pageSum; i++) {
        $('#select').append('<option>' + i + '/' + pageSum + '</option>');
    }
    //点击上一页
    $('#page .pre a').click(function(e) {
        e = e || window.event;
        e.preventDefault();
        if (page == 1) {
            alert('已经是第一页啦！')
        } else {
            page--;
            pageRequest(page, id);
             $('#select option').eq(page-1).prop('selected','selected')
        }
    })

    //点击下一页
    $('#page .next a').click(function(e) {
        e = e || window.event;
        e.preventDefault();
        if (page == pageSum) {
            alert('已经是最后一页啦！')
        } else {
            page++;
            pageRequest(page, id);
            $('#select option').eq(page-1).prop('selected','selected');
        }
    })

    //选中翻页
    $('#select').change(function() {
        page =$(this).val().split('/')[0]
        pageRequest(page, id);
    })
        //点击列表进入商品详情
        jump();
   
})

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
    function jump(){
         $('#section .mui-table-view li').on('click', 'a', function() {
        $(this).attr('href', '02-storeDetails.html#' + this.id);

    })
    }