$(function() {
    var page = 0;
    var pageSum;
    savePageRequest(page);
    //点击列表进入商品详情
    saveDetails();
    //发送省钱控商品列表api
    function savePageRequest(page) {
        $.ajaxSettings.async = false //设置为同步请求
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: {
                pageid: page,
            },
            success: function(obj) {
                var html = template('saveTpl', obj);
                $('#dis ul').html(html);
                pageSum = Math.ceil(obj.totalCount / obj.pagesize);

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
        if (page == 0) {
            alert('已经是第一页啦！')
        } else {
            page--;
            savePageRequest(page);
            $('#select option').eq(page).prop('selected', 'selected')
            saveDetails()
        }
        
    })

    //点击下一页
    $('#page .next a').click(function(e) {
        e = e || window.event;
        e.preventDefault();
        if (page == pageSum-1) {
            alert('已经是最后一页啦！')
        } else {
            page++;
            savePageRequest(page);
            $('#select option').eq(page).prop('selected', 'selected');
            saveDetails()
        }
      
    })

    //选中翻页
    $('#select').change(function() {
        page = $(this).val().split('/')[0];
        savePageRequest(page);
        saveDetails()
    })
})

 function saveDetails() {
        //点击列表进入商品详情
        $('#dis .mui-table-view-cell').on('click', 'a', function() {
            $(this).attr('href', '03-saveDetails.html#' + this.id);
        })
    };
