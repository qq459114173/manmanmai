$(function() {
    var categoryid = 0;
    //发送分类标题API请求
    title();
    //点击分类标题展开分页
    unfold();
    //点击分类跳转到商品列表
    jump(); 
})

function title() {
    $.ajax({
        url: 'http://localhost:9090/api/getcategorytitle',
        success: function(obj) {
            var html = template('comparetpl', obj);
            $('#section').html(html);
            //发送分类列表API请求
            var index = obj.result.length;
            for (var i = 0; i < index; i++) {
                $.ajaxSettings.async = false //设置为同步请求
                $.ajax({
                    url: 'http://localhost:9090/api/getcategory',
                    data: {
                        titleid: i,
                    },
                    success: function(obj) {
                        var html = template('contenttpl', obj);
                        $('#section ul')[i].innerHTML = html;
                    },
                })
            }
        }
    })
};

function unfold() {
    $('#section').on('click', '.title', function() {
        if ($(this).next().css('display') == 'block') {
            $(this).next().css('display', 'none');
        } else {
            $(this).next().css('display', 'block');
        }
    })
};

function jump() {
    $('#section').on('click', 'li', function() {
        $(this).children('a').attr('href', '02-storeList.html' + '#' + this.id);

    })
}
