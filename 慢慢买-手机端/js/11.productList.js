$(function() {
    var mmb = new MMB();
    //调用ulr的参数值
    mmb.search = mmb.getQueryString('search');
    //调用获取对应的id值
    mmb.getCategoryid(function(obj) {
        for (var i = 0; i < obj.result.length; i++) {
            if (obj.result[i].category == mmb.search) {
                mmb.categoryid = obj.result[i].categoryId;
            }
        };
        // 调用查询商品列表
        mmb.queryProduct(function(data) {
            var html = template('productlistTpl', data);
            $('#section .mui-table-view').html(html);
            //重置上拉加载的效果 但是会自动触发一次上拉
            mui('#pullrefresh').pullRefresh().refresh(true);
        });
    });
    //调用加载初始化
    mmb.initLoading();
    //调用商品排序
    mmb.sortProduct();
    //调用商品搜索
    mmb.searchProduct();

})
var MMB = function() {

}
MMB.prototype = {
    search: '',
    categoryid: 0,
    pageid: 1,
    //获取url传递过来的参数值
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    },
    //获取参数值对应的id值
    getCategoryid: function(callback) {
        $.ajax({
            url: 'http://localhost:9090/api/getcategory',
            data: {
                titleid: 0
            },
            success: function(obj) {
                callback(obj);
            }
        });
    },

    // 查询商品列表的函数
    queryProduct: function(callback) {
        $.ajax({
            url: 'http://localhost:9090/api/getproductlist',
            data: {
                'categoryid': this.categoryid,
                'pageid': this.pageid,
            },
            success: function(data) {
                if (callback) {
                    callback(data);
                }
            }
        });
        $('.content ul').on('tap', 'a', function() {
            location.href = '02-storeDetails.html#' + $(this).data('id');
        })
    },
    initLoading: function() {
        var that = this;
        mui.init({
            pullRefresh: {
                //传入区域滚动(下拉刷新的父容器) 的选择器
                container: '#pullrefresh',
                down: {
                    //初始化下拉刷新 回调函数在你执行下拉操作的时候触发
                    callback: pulldownRefresh
                },
                up: {
                    //初始化上拉 回调函数在你执行上拉操作的时候触发
                    contentrefresh: '正在加载...',
                    callback: pullupRefresh
                }
            }
        });
        //下拉刷新的回调函数
        function pulldownRefresh() {
            setTimeout(function() {
                that.pageid = 1;
                that.queryProduct(function(data) {
                    //重新渲染到页面上
                    var html = template('productlistTpl', data);
                    $('#section .mui-table-view').html(html);
                    //数据渲染完毕结束下拉刷新
                    mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                    //重置上拉加载更多
                    mui('#pullrefresh').pullRefresh().refresh(true);
                });
            }, 1000)
        };

        //上拉加载的回调函数
        function pullupRefresh() {
            setTimeout(function() {
                that.pageid++;
                that.queryProduct(function(data) {
                    //判断当前data.data的是否有值
                    if (data.result.length > 0) {
                        var html = template('productlistTpl', data);
                        $('#section .mui-table-view').append(html);
                        //正常结束上拉结束
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                    } else {
                        // 没有数据就完全结束上拉加载
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    }
                })
            }, 1000)
        };
    },
    //商品排序函数
    sortProduct: function() {
        var that = this;
        $('.title a').on('tap', function() {
            //把选中类名进行样式改变
            $(this).parent().addClass('active').siblings().removeClass('active');

            var sortType = $(this).data('sort-type'); //获取点击的是价格排序还是销量排序
            var sort = $(this).data('sort') //获取是升序还是降序;
            sort = sort == 1 ? 2 : 1;
            $(this).data('sort', sort);
            if (sortType == 'price') { //执行价格排序
                that.queryProduct(function(data) {
                    var arr = data.result;
                    var money, money2;
                    for (var i = 0; i < arr.length - 1; i++) {
                        for (var j = 0; j < arr.length - 1 - i; j++) {
                            money = +arr[j].productPrice.split('￥')[1];
                            money2 = +arr[j + 1].productPrice.split('￥')[1];
                            if (sort == 1) {
                                if (money > money2) {
                                    var temp = arr[j];
                                    arr[j] = arr[j + 1];
                                    arr[j + 1] = temp;
                                }
                            } else {
                                if (money < money2) {
                                    var temp = arr[j];
                                    arr[j] = arr[j + 1];
                                    arr[j + 1] = temp;
                                }
                            }
                        }
                    }
                    var html = template('productlistTpl', { result: arr });
                    $('#section .mui-table-view').html(html);
                    //重置上拉加载的效果 但是会自动触发一次上拉
                    mui('#pullrefresh').pullRefresh().refresh(true);
                });

            } else if (sortType == 'num') { //执行销量排序
                that.queryProduct(function(data) {
                    var arr = data.result;
                    var money, money2;
                    for (var i = 0; i < arr.length - 1; i++) {
                        for (var j = 0; j < arr.length - 1 - i; j++) {
                            money = +arr[j].productCom.substring(3, 7);
                            money2 = +arr[j + 1].productCom.substring(3, 7);
                            if (sort == 1) {
                                if (money > money2) {
                                    var temp = arr[j];
                                    arr[j] = arr[j + 1];
                                    arr[j + 1] = temp;
                                }
                            } else {
                                if (money < money2) {
                                    var temp = arr[j];
                                    arr[j] = arr[j + 1];
                                    arr[j + 1] = temp;
                                }
                            }
                        }
                    }
                    var html = template('productlistTpl', { result: arr });
                    $('#section .mui-table-view').html(html);
                    //重置上拉加载的效果 但是会自动触发一次上拉
                    mui('#pullrefresh').pullRefresh().refresh(true);
                });
            } else {
                // 调用查询商品列表
                that.queryProduct(function(data) {
                    var html = template('productlistTpl', data);
                    $('#section .mui-table-view').html(html);
                    //重置上拉加载的效果 但是会自动触发一次上拉
                    mui('#pullrefresh').pullRefresh().refresh(true);
                });
            }

        });
    },
    // 商品列表搜索功能
    searchProduct: function() {
        var that = this;
        $('#search a').on('tap', function() {
            that.search = $('.searchtext input').val();
            that.pageid = 1;
            //调用查询搜索的商品
            that.getCategoryid(function(obj) {
                for (var i = 0; i < obj.result.length; i++) {
                    if (obj.result[i].category == that.search) {
                        that.categoryid = obj.result[i].categoryId;
                    }
                };
                // 调用查询商品列表
                that.queryProduct(function(data) {
                    var html = template('productlistTpl', data);
                    $('#section .mui-table-view').html(html);
                    //重置上拉加载的效果 但是会自动触发一次上拉
                    mui('#pullrefresh').pullRefresh().refresh(true);
                });
            });
        });
    },
};
