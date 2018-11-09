$(function () {
    var productId=0;
    var mmb = new Mmb();
    var search = location.search;
    var brandTitleId =search.substring(14);
    //发起品牌标题对应的十大品牌API请求
    mmb.getbrand(brandTitleId);
    //销售排行商品的评论API请求;
    mmb.getproductcom(productId);
    // 获取品牌大全标题api请求
    mmb.getbrandtitle();    
    //十大品牌销售排行商品列表API请求
    mmb.getbrandproductlist(brandTitleId);
});
var Mmb = function () {

}

Mmb.prototype = {
      // 获取品牌大全标题api请求
    getbrandtitle: function(){
        $.ajax({
            url:'http://localhost:9090/api/getbrandtitle',
            dataType:'json',
            success:function(obj){
               var index=location.search.substring(14);
               var brandTitle=obj.result[index].brandTitle;
               title=brandTitle.split('十')[0];
               $(document)[0].title=title+'十大品牌排行榜'; //修改网页头部标题
               $('#brandTop10 >.title a').html(title+'哪个牌子好');//修改小标题内容
               $('#subTitle >a').html(title);
               $('#saleTop10 >.title a').html(title+'产品销量排行');
               $('#commentTop10 >.title a').html(title+'最新评论');
               $('#main >a').html(title+'购物榜单');
            }
        });
    },
//发起品牌标题对应的十大品牌API请求
    getbrand: function (Id) {
        $.ajax({
            url: 'http://localhost:9090/api/getbrand',
            data: {
                brandtitleid: Id,
                pagesize:10
            },
            success: function (result) {
                var html = template('getbrandTpl',result);
                $('#brandTop10 ul').html(html);
            }
        });
    }, 
      //销售排行商品的评论API请求;
    getproductcom: function (Id) {
        $.ajaxSettings.async = false //设置为同步请求
        $.ajax({
            url: 'http://localhost:9090/api/getproductcom',
            data: {
                productid : Id
            },
            success: function (result) {
                var html = template('getproductcomTpl', result);
                $('#commentTop10 ul').html(html);
            }
        });
    },
    
    //十大品牌销售排行商品列表API请求
    getbrandproductlist: function (Id) {
        $.ajax({
            url: 'http://localhost:9090/api/getbrandproductlist',
            data: {
                brandtitleid: Id,
            },
            success: function (obj) {
                var html = template('getbrandproductlistTpl', obj);
                $('#saleTop10 ul').html(html);
                $lis=$('#commentTop10 li');
                var img=obj.result[0].productImg;
                $lis.each(function(index,ele){
                   $(ele).find('img').attr('src',img.split('"')[1]);
                   $(ele).find('.mui-media-body').html(obj.result[0].productName);
                });
            }
        });
    },
}