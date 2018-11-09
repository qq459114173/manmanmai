$(function() {
    var id = location.hash.substr(1, 2) || 0;
    //发送商品详情api请求
   dustuibDetails(id)
    //发送商品评论api请求
   comment(id)
})

function dustuibDetails(id){
     //发送商品详情api请求
    $.ajax({
        url: 'http://localhost:9090/api/getproduct',
        data: {
            productid: id
        },
        success: function(obj) {
            var html = template('detailsTpl', obj);
            $('#main .details').html(html);
            var list = template('detailsTpl2', obj);
            $('#main .bjShop').html(list);
            //改变导航名称
            var name=obj.result[0].productName
            $('#subTitle a').html(name.split(' ')[0]);
            $('#name a').html(name.substr(-2,2)+' >')
            $('#name a').attr('href','10-distop.html?brandTitleId='+obj.result[0].categoryId)
        }
    });
}

function comment(id){
     $.ajax({
        url: 'http://localhost:9090/api/getproductcom',
        data: {
            productid: id
        },
        success: function(obj) {
            var html = template('datailsTpl3', obj);
            $('#main .pj_list').html(html);
        }
    });
}