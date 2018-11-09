$(function() {
    //发送首页菜单栏请求
    var mmb = new MMB();
    mmb.getIndexMenu();
    //发送首页超值折扣推荐请求
    mmb.getMoneyCtrl();
    //设置导航栏点击事件和跳转网页
    mmb.navButton();
    //初始化注册页面按钮提示
    // $('[data-toggle="tooltip"]').tooltip()
});

//创建一个MMD构造函数
var MMB = function() {

};
//给MMD原型添加公共方法
MMB.prototype = {
    // 在原型的对象上写一个公共URL，然后进行拼接
    baseURL: 'http://localhost:9090/api/', //本地请求连接
    // baseURI:'http://mmb.ittun.com/api/', //服务器请求连接
    //首页菜单栏
    getIndexMenu: function() {
        $.ajax({
            url: this.baseURL + 'getindexmenu',
            success: function(obj) {
                var html = template('indexNavtpl', obj);
                $('#nav .mui-row').html(html);
            },
        })
    },

    //首页超值折扣推荐
    getMoneyCtrl: function() {
        $.ajax({
            url: this.baseURL + 'getmoneyctrl',
            success: function(obj) {
                var html = template('indexRecommendtpl', obj);
                $('#dis>.mui-table-view').html(html);
            }
        });
    },
    //首页导航栏隐藏显示
    navButton: function() {
        $('#nav .mui-row').on('click', 'div', function() {
            if (this == document.getElementById('more')) {
                $('#nav .mui-row .more').each(function(index, ele) {
                    if (ele.style.display == 'none') {
                        ele.style.display = 'block';
                    } else {
                        ele.style.display = 'none';
                    }

                })
            }
            //动态添加a的跳转
            switch (this.id) {
                case 'nav0':
                    this.children[0].href = '02-compareSearch.html';
                    break;
                case 'nav1':
                    this.children[0].href = '03-save.html';
                    break;
                case 'nav2':
                    this.children[0].href = '04-discount.html';
                    break;
                case 'nav3':
                    this.children[0].href = '05-lowPrice.html';
                    break;
                case 'nav4':
                    this.children[0].href = '03-save.html';
                    break;
                case 'nav5':
                    this.children[0].href = '07-coupons.html';
                    break;
                case 'nav6':
                    this.children[0].href = '04-discount.html';
                    break;
                case 'nav8':
                    this.children[0].href = '08-collect.html';
                    break;
                case 'nav9':
                    this.children[0].href = '09-storeNav.html';
                    break;
                case 'nav10':
                    this.children[0].href = '09-storeNav.html';
                    break;
                case 'nav11':
                    this.children[0].href = '10-top.html';
                    break;
            }
        })
    },
}